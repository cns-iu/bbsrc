const fs = require('fs');
import { BBSRCDatabase } from '../nsql/bbsrc-database';

import { DB_DUMP, DB_SQLITE } from './options';

function readJSON(inputFile: string): any {
  return JSON.parse(fs.readFileSync(inputFile));
}

const dump = readJSON(DB_DUMP);

async function importDBDump(adapter: string = 'PERM'): Promise<any> {
  const database = new BBSRCDatabase(false, adapter, {dbPath: DB_SQLITE});
  const db = await database.get();
  const hasResults = !!(await database.collectionCount('publication'))
  if (!hasResults) {
    await db.rawImport(dump);
  }
  return db;
}

importDBDump().then(() => {
  console.log('DB Imported');
  process.exit();
});
