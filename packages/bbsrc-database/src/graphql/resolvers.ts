import { pubsub } from './subscriptions';
import * as moment from 'moment';

import { GraphQLContext } from './context';

import { getPublications, getSubdisciplines } from '../rxdb/queries';

export const resolvers: any = {
  Query: {
    'getPublications': (obj, args, context: GraphQLContext, info) => {
      return getPublications(context.database, args.filter);
    },
    'getSubdisciplines': (obj, args, context: GraphQLContext, info) => {
      return getSubdisciplines(context.database, args.filter);
    }
  }
};
