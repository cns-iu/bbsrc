const fs = require('fs');
import * as XLSX from 'xlsx';

import { Operator } from '@ngx-dino/core/operators';
import { journalLookup, disciplineLookup } from './science-mapper';

const GRANTS = '../../raw-data/grants.xlsx';
const PUBS = '../../raw-data/publications.xlsx';
const GRANTS_JSON = '../../raw-data/grants.json';
const PUBS_JSON = '../../raw-data/publications.json';
const DB_JSON = '../../raw-data/database.json';

function readXLS(inputFile: string, sheetName?: string): any[] {
  const wb = XLSX.readFile(inputFile);
  sheetName = sheetName || wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(ws);
  return data;
}
function writeJSON(outputFile: string, obj: any) {
  fs.writeFileSync(outputFile, JSON.stringify(obj, null, 2), 'utf8');
}
function writeJSONArray(outputFile: string, data: any[], operator: Operator<any, any>) {
  const file = fs.createWriteStream(outputFile);
  file.on('error', function(err) { console.log(err); });

  file.write('[\n');
  data.forEach((item) => {
    item = operator.get(item);

    file.cork();
    file.write(JSON.stringify(item, null, 2) + '\n');
    file.uncork();
  });
  file.write(']\n');
  file.end();
}
function a(field: string): Operator<any, any> {
  return Operator.access(field, '-').map((val) => val === '-' ? undefined : val);
}
function NumberOrUndefined(value: string): number {
  const numberValue = Number(value);
  return isNaN(numberValue) ? undefined : numberValue;
}
function n(field: string): Operator<any, number> {
  return a(field).map(NumberOrUndefined);
}

const CLASS_FIELDS = [
  'AGE', 'AH', 'AW', 'CS', 'DH', 'EGX', 'IB', 'IMM', 'MFS', 'MIC', 'NS', 'PHM',
  'PS', 'RE', 'RRR', 'SB', 'SC', 'SS', 'STR', 'SYN', 'TD', 'AFS', 'BH', 'IBBE',
  'NWW', 'WUB'
];
const getClassifications = Operator.map((item: any): string[] => {
  const classes = [];
  for (const c of CLASS_FIELDS) {
    const value = item[c] || null;
    if (value && value !== '-' && !value.endsWith('X')) {
      classes.push(c);
    }
  }
  return classes;
});

const grantsProcessor = Operator.combine({
  'id': a('GrantReference'),
  'title': a('Title'),
  'technical_summary': a('TechnicalSummary'),
  'initiative': a('Initiative'),
  'mechanism': a('InvestmentMechanism'),
  'start_date': a('StartDate'),
  'end_date': a('EndDate'),
  'scheme_name': a('SchemeName'),
  'institution': a('AwardInstitution'),
  'department': a('AwardDepartment'),
  'session_year': n('Session'),
  'group_member': a('GroupMember'),
  'total_award_value': n('TotalAwardValue'),
  'pi': {
    'title': a('PI Title'),
    'first_name': a('PI FirstName'),
    'last_name': a('PI Surname'),
    'initials': a('PI Initials')
  },
  'research_classification': getClassifications
});
let grants: any[] = readXLS(GRANTS).map(grantsProcessor.getter);
let grantsMap: any = {};
grants.forEach((grant) => { grantsMap[grant.id] = grant; });

const pubsProcessor = Operator.combine({
  'id': Operator.autoId(),
  'grant_id': a('File Reference'),
  'grant': a('File Reference').lookup(grantsMap),
  'type': a('Type'),
  'pmid': a('PMID'),
  'author': a('Author'),
  'title': a('Publication title'),
  'journal_name': a('Journal'),
  'volume': a('Volume'),
  'issue': a('Issue'),
  'pages': a('Pages'),
  'month': a('Month'),
  'year': a('Year'),
  'pmcid': a('PMCID'),
  'doi': a('DOI')
});
const pubs: any[] = readXLS(PUBS).map(pubsProcessor.getter);

grants = null;
grantsMap = null;

let journal2weights: any = {};
let journal2journ_id: any = {};
pubs.forEach((pub) => {
  const journal = pub.journal_name;
  if (!journal2journ_id.hasOwnProperty(journal)) {
    pub.journ_id = journal2journ_id[journal] = journalLookup.access('id').get(journal);
    if (pub.journ_id) {
      journal2weights[pub.journ_id] = disciplineLookup.get(pub.journ_id);
    } else {
      pub.journ_id = undefined;
    }
  } else {
    pub.journ_id = journal2journ_id[journal];
  }
  pub.subdisciplines = journal2weights[pub.journ_id] || undefined;
});

journal2journ_id = null;
journal2weights = null;

const pubsDBProcessor = Operator.combine({
  'id': n('id'),
  'title': a('title'),
  'author': a('author'),
  'pmid': a('pmid'),
  'doi': a('doi'),
  'pmcid': a('pmcid'),

  'journalName': a('journal_name'),
  'journalId': a('journ_id'),
  'subdisciplines': a('subdisciplines'),

  'grantId': a('grant_id'),
  'grantTitle': a('grant.title'),
  'grantSummary': a('grant.technical_summary'),
  'grantClasses': a('grant.research_classification'),
  'grantYear': a('grant.session_year'),
  'grantInstitution': a('grant.institution'),
  'grantMechanism': a('grant.mechanism'),
});
writeJSONArray(DB_JSON, pubs, pubsDBProcessor);

// console.log(grants.length);
// console.log(JSON.stringify(grants[0]));
// console.log(pubs.length);
// console.log(JSON.stringify(pubs[0]));
//
// writeJSON(DB_JSON, pubs);
