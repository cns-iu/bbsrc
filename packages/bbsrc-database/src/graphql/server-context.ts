const fs = require('fs');
import { BBSRCDatabase } from '../nsql/bbsrc-database';
import { GraphQLContext } from './context';

import { DB_DUMP, DB_SQLITE } from '../loader/options';

function readJSON(inputFile: string): any {
  return JSON.parse(fs.readFileSync(inputFile));
}

async function importDBDump(database: BBSRCDatabase, dumpFile: string): Promise<any> {
  const dump = readJSON(dumpFile);

  const db = await database.get(async (db) => {
    const hasResults = !!(await database.collectionCount('publication', db));
    if (!hasResults) {
      await db.rawImport(dump);
    }
  });
  return db;
}

export function createServerContext(adapter = 'PERM', dbDumpFile = DB_DUMP, sqliteFile = DB_SQLITE): GraphQLContext {
  console.log(adapter, dbDumpFile, sqliteFile);
  const options: any = {};
  if (['PERM'].indexOf(adapter) !== -1 && sqliteFile) {
    options['dbPath'] = sqliteFile;
  }
  const database = new BBSRCDatabase(false, adapter, options);

  importDBDump(database, dbDumpFile).then(() => {
    console.log('DB Loaded');
  });
  return new GraphQLContext(database);
}
