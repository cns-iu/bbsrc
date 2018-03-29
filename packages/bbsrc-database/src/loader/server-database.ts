const fs = require('fs');
import { BBSRCDatabase } from '../rxdb/bbsrc-database';
import { GraphQLContext } from '../graphql/context';

import { DB_DUMP, DB_SQLITE } from './options';

function readJSON(inputFile: string): any {
  return JSON.parse(fs.readFileSync(inputFile));
}

const dump = readJSON(DB_DUMP);

async function importDBDump(database: BBSRCDatabase): Promise<any> {
  const db = await database.get();
  const hasResults = !!(await db.publication.findOne().exec());
  if (!hasResults) {
    await db.importDump(dump);
  }
  return db;
}

export function createServerContext(): GraphQLContext {
  const database = new BBSRCDatabase(false, 'websql', {name: DB_SQLITE});
  importDBDump(database).then(() => {
    console.log('DB Loaded');
  });
  return new GraphQLContext(database);
}

export const context = createServerContext();
