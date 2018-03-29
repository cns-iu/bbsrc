import { createWorker, handleSubscriptions } from 'apollo-link-webworker';

import { schema } from './graphql/schema';
import { clientdb_context as context } from './graphql/context';
import { pubsub } from './graphql/subscriptions';

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
