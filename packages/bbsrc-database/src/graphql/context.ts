import { NanoSQLInstance } from 'nano-sql';
import { BBSRCDatabase } from '../nsql/bbsrc-database';

export class GraphQLContext {
  constructor(public database: BBSRCDatabase, public db?: NanoSQLInstance) {
    if (!db) {
      database.get().then((dbInstance) => { this.db = dbInstance; });
    }
  }
}
