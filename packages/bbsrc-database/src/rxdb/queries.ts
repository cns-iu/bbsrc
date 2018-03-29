import { BBSRCDatabase } from '../rxdb/bbsrc-database';
import { Filter } from '../shared/filter';
import { Publication } from '../shared/publication';
import { SubdisciplineWeight } from '../shared/subdiscipline-weight';

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

export async function getPublications(database: BBSRCDatabase, filter: Filter = <Filter>{}): Promise<Publication[]> {
  const db = await database.get();

  const query = db.publication.find();
  // TODO: implement filter queries

  const results: Publication[] = await query.exec();
  return results || [];
}

export async function getSubdisciplines(database: BBSRCDatabase, filter: Filter = <Filter>{}): Promise<SubdisciplineWeight[]> {
  const publications = await getPublications(database, filter);
  const weights = sumAgg<SubdisciplineWeight>(publications.map((item) => item.subdisciplines), 'subd_id', 'weight');

  return Object.entries(weights).map(([k, v]) => <SubdisciplineWeight>{subd_id: <number>(<any>k), weight: v});
}
