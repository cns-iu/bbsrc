import { RxBBSRCDatabase } from '../rxdb/rxdb-types';
import { BBSRCDatabase } from '../rxdb/bbsrc-database';

export class GraphQLContext {
  constructor(public database: BBSRCDatabase, public db?: RxBBSRCDatabase) {
    if (!db) {
      database.get().then((dbInstance) => { this.db = dbInstance; });
    }
  }
}

export const clientdb_context = new GraphQLContext(new BBSRCDatabase(false, 'memory'));
