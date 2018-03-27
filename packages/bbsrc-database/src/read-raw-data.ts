// import * as fs from 'fs';
import * as XLSX from 'xlsx';

import { Operator } from '@ngx-dino/core';

import '@ngx-dino/core/src/operators/add/all';
// import '@ngx-dino/core/src/operators/add/static/access';
// import '@ngx-dino/core/src/operators/add/static/auto-id';
// import '@ngx-dino/core/src/operators/add/static/combine';

const AWARDS = '/bbsrc7/awards.xlsx';
const PUBS = '/bbsrc7/publications.xlsx';
const AWARDS_JSON = '/bbsrc7/awards.json';
const PUBS_JSON = '/bbsrc7/publications.json';

function readXLS(inputFile, sheetName: string = null): any[] {
  const wb = XLSX.readFile(inputFile);
  sheetName = sheetName || wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(ws);
  return data;
}

const a = Operator.access;

const awardsProcessor = Operator.combine({
  'id': a('GrantReference'),
  'title': a('Title'),
  'abstract': a('TechnicalSummary'),
  'author': Operator.combine({
    'title': a('PI Title'),
    'first_name': a('PI FirstName'),
    'last_name': a('PI Surname'),
    'initials': a('PI Initials')
  }),
  'research_classification': 'XX',
  'award_spend_year': a('Session'),
  'award_institution': a('AwardInstitution'),
  'mechanism': a('InvestmentMechanism')
});

const awards: any[] = readXLS(AWARDS).map(awardsProcessor.getter);
const awardsMap: any = {};
awards.forEach((a) => { awardsMap[a.id] = a; });

console.log(awards.length);
console.log(JSON.stringify(awards[0]));

const getAward = a('File Reference').lookup(awardsMap);
const pubsProcessor = Operator.combine({
  'id': Operator.autoId(),
  'grant_id': a('File Reference'),
  'grant': getAward,
  'title': a('Title'),
  'abstract': a('TechnicalSummary'),
  'author': a('PI FirstName'),
  'research_classification': 'XX',
  'award_spend_year': a('Session')
});


const pubs = readXLS(PUBS).map(pubsProcessor.getter);
console.log(pubs.length);
console.log(JSON.stringify(pubs[0]));
