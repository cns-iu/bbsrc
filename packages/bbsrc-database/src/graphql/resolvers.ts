import { pubsub } from './subscriptions';
import * as moment from 'moment';

import { context } from '../loader/server-database';
import { getPublications, getSubdisciplines } from '../rxdb/queries';

export const resolvers: any = {
  Query: {
    'getPublications': (obj, args, ctx, info) => {
      return getPublications(context.database, args.filter);
    },
    'getSubdisciplines': (obj, args, ctx, info) => {
      return getSubdisciplines(context.database, args.filter);
    }
  }
};
