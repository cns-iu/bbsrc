import { DBRow, NanoSQLInstance, nSQL } from 'nano-sql';

import { BBSRCDatabase } from '../nsql/bbsrc-database';
import { Filter } from '../shared/filter';
import { Publication } from '../shared/publication';
import { SubdisciplineWeight } from '../shared/subdiscipline-weight';
import { QueryResults } from '../shared/query-results';


// FROM: https://github.com/sindresorhus/escape-string-regexp/
const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
function escapeStringRegExp(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe, '\\$&');
}

const UNMAPPED = -1;
const MULTIDISCIPLINARY = -2;

async function sumAgg<T>(items: T[], itemKeyField: string, keyField: string, valueField: string): Promise<{[key: string]: number}> {
  const acc: any = {};
  for (const innerItem of items) {
    for (const item of (innerItem[itemKeyField] || [])) {
      const key = item[keyField];
      const weight = item[valueField];
      if (acc.hasOwnProperty(key)) {
        acc[key] += weight;
      } else {
        acc[key] = weight;
      }
    }
  }
  return acc;
}

async function queryPublications(database: BBSRCDatabase, filter: Partial<Filter> = {}, selectArgs?: any): Promise<any[]> {
  const db = await database.get();

  let query = db.table('publication').query("select", selectArgs);
  if (filter.subd_id && filter.subd_id.length > 0) {
    query = db.table('publication').query("select");
  }
  const where: any[] = [];
  const inOrEq = function(field: string, filter: string[]): any[] {
    if (filter.length === 1) {
      return [field, '=', filter[0]];
    } else {
      return [field, 'IN', filter];
    }
  }

  if (filter.journalName) {
    if (where.length > 0) { where.push('AND'); }
    where.push(inOrEq('journalName', filter.journalName));
  }
  if (filter.mechanism) {
    if (where.length > 0) { where.push('AND'); }
    where.push(inOrEq('grantMechanism', filter.mechanism));
  }
  if (filter.institution) {
    if (where.length > 0) { where.push('AND'); }
    where.push(inOrEq('grantInstitution', filter.institution));
  }
  if (filter.year) {
    if (where.length > 0) { where.push('AND'); }
    if (filter.year.start === filter.year.end) {
      where.push(['year','=',filter.year.start]);
    } else {
      where.push(['year','>=', filter.year.start]);
      where.push('AND');
      where.push(['year','<=', filter.year.end]);
      // where.push(['year','BETWEEN',[filter.year.start, filter.year.end]]);
    }
  }
  if (filter.sessionYear) {
    if (where.length > 0) { where.push('AND'); }
    if (filter.sessionYear.start === filter.sessionYear.end) {
      where.push(['grantYear','=',filter.sessionYear.start]);
    } else {
      where.push(['grantYear','>=', filter.sessionYear.start]);
      where.push('AND');
      where.push(['grantYear','<=', filter.sessionYear.end]);
      // where.push(['grantYear','BETWEEN',[filter.sessionYear.start, filter.sessionYear.end]]);
    }
  }
  if (filter.researchClassification) {
    if (where.length > 0) { where.push('AND'); }
    where.push(['grantClasses','INTERSECT', filter.researchClassification]);
  }
  if (filter.fulltext) {
    if (where.length > 0) { where.push('AND'); }
    const regexp = filter.fulltext.map((text) => escapeStringRegExp(text)).join('|').toLowerCase();
    where.push(['fulltext', 'REGEX', regexp]);
  }
  if (where.length > 0) {
    query = query.where(where.length === 1 ? where[0] : where);
  }
  if (filter.sort && filter.sort.length > 0) {
    const field = filter.sort[0].field;
    const ascending = filter.sort[0].ascending === true;

    const order = {};
    order[field] = ascending === true ? 'asc' : 'desc';
    query = query.orderBy(order);
  }
  if (filter.subd_id && filter.subd_id.length > 0) {
    // FIXME: Find a cleaner way to do this.
    const subd_ids = filter.subd_id || [];
    const isMultiDisc = subd_ids.indexOf(MULTIDISCIPLINARY) !== -1;
    const isUnmapped = subd_ids.indexOf(UNMAPPED) !== -1;
    const subd_idMap = {}; subd_ids.forEach(s => subd_idMap[s] = true);

    let results = await query.exec();
    results = results.filter((row) => {
      const subdisciplines: SubdisciplineWeight[] = row.subdisciplines || [];

      if (isMultiDisc && subdisciplines.length > 1) {
        return true;
      } else if (isUnmapped && subdisciplines.length == 0) {
        return true;
      } else {
        return subdisciplines.some((s) => subd_idMap[s.subd_id]);
      }
    });
    if (filter.limit && filter.limit > 0) {
      results = results.slice(0, filter.limit);
    }
    query = nSQL(results).query('select', selectArgs);
  } else {
    if (filter.limit && filter.limit > 0) {
      query = query.limit(filter.limit);
    }
  }
  return (await query.exec());
}

export async function getPublications(database: BBSRCDatabase, filter: Partial<Filter> = {}): Promise<QueryResults<Publication>> {
  const results = await queryPublications(database, filter);
  let totalCount = results.length;
  if (filter.limit && filter.limit > 0) {
    filter = Object.assign({}, filter, {limit: 0});
    const totalCountResults = (await queryPublications(database, filter, ['COUNT(*) AS total']))[0];
    totalCount = totalCountResults['total'] || totalCountResults['COUNT(*) AS total'] || 0;
  }
  return { results, pageInfo: { totalCount } };
}

export async function getSubdisciplines(database: BBSRCDatabase, filter: Partial<Filter> = {}): Promise<QueryResults<SubdisciplineWeight>> {
  const publications = (await queryPublications(database, filter, ['subdisciplines'])).map((pub) => {
    if (filter.showUnmapped && (!pub.subdisciplines || pub.subdisciplines.length === 0)) {
      return {'subdisciplines':[{subd_id: UNMAPPED, weight: 1}]};
    } else if (filter.showMultidisciplinary && pub.subdisciplines && pub.subdisciplines.length > 1) {
      return {'subdisciplines':[{subd_id: MULTIDISCIPLINARY, weight: 1}]};
    } else {
      return pub;
    }
  });
  const weights = await sumAgg<Partial<Publication>>(publications, 'subdisciplines', 'subd_id', 'weight');

  const results = Object.entries(weights).map(([k, v]) => <SubdisciplineWeight>{subd_id: <number>(<any>k), weight: v});
  const totalCount = results.length;
  return { results, pageInfo: { totalCount } };
}

export async function getDistinct(database: BBSRCDatabase, fieldName: string, filter: Partial<Filter> = {}): Promise<QueryResults<string>> {
  // TODO: make this more efficient.

  const publications = (await queryPublications(database, filter, [fieldName]));
  const values: any = {};
  const results = [];
  publications.forEach((pub) => {
    let val = pub[fieldName];
    if (!(typeof val === 'string' || val instanceof String)) {
      val = JSON.stringify(val);
    }
    if (!values.hasOwnProperty(val)) {
      values[val] = 1;
      results.push(val);
    } else {
      values[val]++;
    }
  });

  const totalCount = results.length;
  return { results, pageInfo: { totalCount } };
}
