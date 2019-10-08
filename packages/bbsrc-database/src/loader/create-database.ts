const fs = require('fs');
const bfj = require('bfj');

import { BBSRCDatabase } from '../nsql/bbsrc-database';

import { DB_JSON, DB_DUMP, DB_SQLITE } from './options';

function readJSON(inputFile: string): any {
  return JSON.parse(fs.readFileSync(inputFile));
}

async function writeJSON(outputFile: string, obj: any): Promise<any> {
  fs.writeFileSync(outputFile, JSON.stringify(obj, null, 2), 'utf8');
  return true;
  // return bfj.write(outputFile, obj);
}

async function createDBDump(): Promise<any> {
  let publications = readJSON(DB_JSON);
  console.log(publications.length);

  const database = new BBSRCDatabase(false, 'TEMP');
  const db = await database.get();

  console.log('Populating database');
  await database.initializeCollection('publication', publications);
  publications = null;

  console.log('Dumping Database');
  const dump = await db.rawDump();

  return dump;
}

createDBDump().then(async (dump) => {
  console.log('Writing dump');
  await writeJSON(DB_DUMP, dump);
  process.exit();
});
