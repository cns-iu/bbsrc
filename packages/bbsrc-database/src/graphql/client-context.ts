import { BBSRCDatabase } from '../rxdb/bbsrc-database';
import { GraphQLContext } from './context';

import { DB_DUMP_URI } from '../loader/options';

async function readJSON(uri: string): Promise<any> {
  return (await fetch(uri, { method: 'get' })).json();
}

async function importDBDump(database: BBSRCDatabase): Promise<any> {
  const dump = await readJSON(DB_DUMP_URI);

  const db = await database.get(async (db) => {
    const hasResults = !!(await db.publication.findOne().exec());
    if (!hasResults) {
      console.log("Importing dump");
      await db.importDump(dump)
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
