export const PublicationModel = [
  {key: 'id',type:'string', props:['pk']},
  {key: 'title',type:'string'},
  {key: 'author',type:'string'},
  {key: 'year',type:'int'}, // props: ['idx']
  {key: 'pmid',type:'string'},
  {key: 'doi',type:'string'},
  {key: 'pmcid',type:'string'},
  {key: 'journalName',type:'string'},
  {key: 'journalId',type:'int'},
  {key: 'subdisciplines',type:'array'},
  {key: 'grantId',type:'string'},
  {key: 'grantTitle',type:'string'},
  {key: 'grantClasses',type:'array'},
  {key: 'grantYear',type:'int'}, // props: ['idx']
  {key: 'grantInstitution',type:'string'}, // props: ['idx']
  {key: 'grantMechanism',type:'string'}, // props: ['idx']
  {key: 'fulltext',type:'string'}
];
