const fs = require('fs');
import { BBSRCDatabase } from '../rxdb/bbsrc-database';

import { DB_JSON, DB_DUMP } from './options';

function readJSON(inputFile: string): any {
  return JSON.parse(fs.readFileSync(inputFile));
}

function writeJSON(outputFile: string, obj: any) {
  fs.writeFileSync(outputFile, JSON.stringify(obj, null, 2), 'utf8');
}

async function createDBDump(): Promise<any> {
  let publications = readJSON(DB_JSON);
  console.log(publications.length);

  const database = new BBSRCDatabase(false, 'memory');
  const db = await database.get();

  await database.initializeCollection('publication', publications);
  publications = null;

  console.log('Dumping Database');

  const dump = await db.dump();
  return dump;
}

createDBDump().then((dump) => {
  writeJSON(DB_DUMP, dump);
  process.exit();
});
