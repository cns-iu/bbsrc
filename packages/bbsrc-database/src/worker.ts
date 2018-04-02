import { createWorker, handleSubscriptions } from 'apollo-link-webworker';

import { schema } from './graphql/schema';
import { GraphQLContext } from './graphql/context';
import { pubsub } from './graphql/subscriptions';

import { BBSRCDatabase } from './rxdb/bbsrc-database';

const database = new BBSRCDatabase(false, 'idb');
const context = new GraphQLContext(database);

fetch('/assets/db-dump.json', { method: 'get' }).then(async function(response) {
  const dump = await response.json();

  console.log('Importing Dump');
  const db = await database.get();
  await db.importDump(dump);
  console.log('Dump Loaded');
}).catch(function(err) {
    console.log(err);
});

createWorker({
  schema,
  context
});

self.onmessage = message => handleSubscriptions({
  self,
  message,
  schema,
  context,
  pubsub,
});
