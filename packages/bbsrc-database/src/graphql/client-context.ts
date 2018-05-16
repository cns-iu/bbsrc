import { BBSRCDatabase } from '../nsql/bbsrc-database';
import { GraphQLContext } from './context';

import { DB_DUMP_URI } from '../loader/options';

async function readJSON(uri: string): Promise<any> {
  return (await fetch(uri, { method: 'get' })).json();
}

async function importDBDump(database: BBSRCDatabase): Promise<any> {
  const db = await database.get(async (db) => {
    const hasResults = !!(await database.collectionCount('publication'))
    if (!hasResults) {
      console.log(`Loading dump from ${DB_DUMP_URI}`);
      const dump = await readJSON(DB_DUMP_URI);
      await db.rawImport(dump);
    }
  });
  return db;
}

export function createClientContext(): GraphQLContext {
  const database = new BBSRCDatabase(false, 'idb');
  importDBDump(database).then(() => {
    console.log('DB Loaded');
  });
  return new GraphQLContext(database);
}

export const context = createClientContext();
