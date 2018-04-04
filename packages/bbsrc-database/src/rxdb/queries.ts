import { BBSRCDatabase } from '../rxdb/bbsrc-database';
import { Filter } from '../shared/filter';
import { Publication } from '../shared/publication';
import { SubdisciplineWeight } from '../shared/subdiscipline-weight';
import { RxPublicationDocument } from './rxdb-types';

// FROM: https://github.com/sindresorhus/escape-string-regexp/
const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
function escapeStringRegExp(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe, '\\$&');
}

function sumAgg<T>(items: T[][], keyField: string, valueField: string): {[key: string]: number} {
  return items.reduce((acc, itemsInner) => {
    itemsInner.forEach((item) => {
      const key = item[keyField];
      const weight = item[valueField];
      acc[key] = (acc[key] || 0) + weight;
    });
    return acc;
  }, {});
}

export async function getPublications(database: BBSRCDatabase, filter: Partial<Filter> = {}): Promise<RxPublicationDocument[]> {
  const db = await database.get();

  let query = db.publication.find();
  if (filter.subd_id) {
    query = query.where('subdisciplines').elemMatch({ 'subd_id': {'$in': filter.subd_id }});
  }
  if (filter.journalName) {
    query = query.where('journalName').in(filter.journalName);
  }
  if (filter.mechanism) {
    query = query.where('grantMechanism').in(filter.mechanism);
  }
  if (filter.institution) {
    query = query.where('grantInstitution').in(filter.institution);
  }
  if (filter.sessionYear) {
    if (filter.sessionYear.start === filter.sessionYear.end) {
      query = query.where('grantYear').eq(filter.sessionYear.start);
    } else {
      query = query.where('grantYear').gte(filter.sessionYear.start)
        .where('grantYear').lte(filter.sessionYear.end);
    }
  }
  if (filter.researchClassification) {
    query = query.where('grantClasses').elemMatch({ '$in': filter.researchClassification });
  }
  if (filter.fulltext) {
    const regexp = new RegExp(filter.fulltext.map((text) => escapeStringRegExp(text)).join('|'), 'i');
		query = query.where('grantSummary').regex(regexp);
  }

  if (filter.sort) {
    const sort = filter.sort.map((s) => (s.ascending ? '' : '-') + s.field ).join(' ');
    query = query.sort(sort);
  }
  if (filter.limit && filter.limit > 0) {
    query = query.limit(filter.limit);
  }

  const results: RxPublicationDocument[] = await query.exec();
  return results || [];
}

export async function getSubdisciplines(database: BBSRCDatabase, filter: Partial<Filter> = {}): Promise<SubdisciplineWeight[]> {
  const publications = await getPublications(database, filter);
  const weights = sumAgg<SubdisciplineWeight>(publications.map((item) => item.subdisciplines), 'subd_id', 'weight');

  return Object.entries(weights).map(([k, v]) => <SubdisciplineWeight>{subd_id: <number>(<any>k), weight: v});
}

export async function getDistinct(database: BBSRCDatabase, fieldName: string, filter: Partial<Filter> = {}): Promise<string[]> {
  // TODO: make this more efficient.

  const publications = await getPublications(database, filter);
  const values = new Set();
  const distinct = [];
  publications.forEach((pub) => {
    const val = pub.get(fieldName);
    if (!values.has(val)) {
      values.add(val);
      distinct.push(val);
    }
  });
  return distinct;
}
