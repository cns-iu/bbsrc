import { Set } from 'immutable';
import * as XLSX from 'xlsx';

import { Operator } from '@ngx-dino/core';
import '@ngx-dino/core/src/operators/add/all'; // FIXME be more specific

import { data as journalNames } from '../data-do-not-commit/journals';


const JOURNALS = '../data-do-not-commit/journals.csv';
const MAP_XLSX_FILE = '../data-do-not-commit/UCSDmapDataTables.xlsx';
const MAP_SHEET_JNAME = 'Table 7';
const MAP_SHEET_IDS = 'Table 4';


function normalizeJName(name: string): string {
  return name.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').toLowerCase()
    .split(/\s/).filter((s) => s.length).join(' ');
}


const mapXlsx = XLSX.readFile(MAP_XLSX_FILE);

const jnameSheet = mapXlsx.Sheets[MAP_SHEET_JNAME];
const jnameTable = XLSX.utils.sheet_to_json(jnameSheet, {
  range: jnameSheet['!ref'].replace('A1', 'A13')
});
const jnameLookup = Operator.lookup<string, {}>(jnameTable.map((e) => {
  return [normalizeJName(e['journal_name']), e];
}));

const idSheet = mapXlsx.Sheets[MAP_SHEET_IDS];
const idTable = XLSX.utils.sheet_to_json(idSheet, {
  range: idSheet['!ref'].replace('A1', 'A13')
});
const idLookup = Operator.lookup<number, {}>(idTable.map((e) => {
  return [Number(e['journ_id']), e];
}));


const lookupOp = Operator.chain(
  Operator.map(normalizeJName), jnameLookup,
  Operator.access('journ_id').map(Number), idLookup
);


const names = Set(journalNames).filter((n) => n.length > 0);
const missing = [];
names.forEach((name) => {
  const obj = lookupOp.get(name);
  if (obj === undefined) {
    missing.push(name);
  }
});

console.log(journalNames.length);
console.log(names.size);
console.log(missing.length);
// console.log(missing.slice(0, 20).map(normalizeJName));
