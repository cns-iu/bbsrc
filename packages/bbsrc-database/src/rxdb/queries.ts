import { BBSRCDatabase } from '../rxdb/bbsrc-database';
import { Filter } from '../shared/filter';
import { Publication } from '../shared/publication';
import { SubdisciplineWeight } from '../shared/subdiscipline-weight';
import { RxPublicationDocument } from './rxdb-types';

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

  const query = db.publication.find();
  // TODO: implement filter queries

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
