const fs = require('fs');
import { BBSRCDatabase } from '../rxdb/bbsrc-database';

import { DB_JSON, DB_DUMP } from './options';

function readJSON(inputFile: string): any {
  return JSON.parse(fs.readFileSync(inputFile));
}

const publications = readJSON(DB_JSON);

console.log(publications.length);

function writeJSON(outputFile: string, obj: any) {
  fs.writeFileSync(outputFile, JSON.stringify(obj, null, 2), 'utf8');
}

async function createDBDump(): Promise<any> {
  const database = new BBSRCDatabase(false, 'memory');
  const db = await database.get();

  await database.initializeCollection('publication', publications);

  const dump = await db.dump();
  return dump;
}

createDBDump().then((dump) => {
  writeJSON('../../raw-data/db-dump.json', dump);
  process.exit();
});