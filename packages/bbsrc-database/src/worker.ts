import { createWorker, handleSubscriptions } from 'apollo-link-webworker';

import { schema } from './graphql/schema';
import { GraphQLContext } from './graphql/context';
import { pubsub } from './graphql/subscriptions';

import { BBSRCDatabase } from './rxdb/bbsrc-database';

const context = new GraphQLContext(new BBSRCDatabase(false, 'memory'));

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
