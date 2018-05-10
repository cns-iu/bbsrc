import { nSQL, NanoSQLInstance, NanoSQLConfig } from 'nano-sql';
import { PublicationModel } from './publication.model';

export class BBSRCDatabase {
  private static dbPromise: Promise<NanoSQLInstance> = null;

  collections: any[] = [
    { name: 'publication', schema: PublicationModel }
  ];

  constructor(private production?: boolean, private adapter: string = 'PERM', private nSQLOptions: NanoSQLConfig = {}) { }

  get(initializer?: (db: NanoSQLInstance) => Promise<any>): Promise<NanoSQLInstance> {
    if (!BBSRCDatabase.dbPromise) {
      BBSRCDatabase.dbPromise = this._create(initializer);
    }
    return BBSRCDatabase.dbPromise;
  }

  public async initializeCollection(collection: string, data: any[]) {
    const db = await this.get();
    const coll = db.table(collection);
    if ((await this.collectionCount(collection) === 0)) {
      await coll.loadJS(collection, data);
    }
    const results = await this.collectionCount(collection);
    this.log(`${collection}: ${results}`);
  }

  public async collectionCount(collection: string, db?: NanoSQLInstance): Promise<number> {
    if (!db) {
      db = await this.get();
    }
    const query = db.table(collection).query('select',['COUNT(*) AS total']);
    const results = (await query.exec())[0];
    return results['total'] || results['COUNT(*) AS total'] || 0;
  }

  private async initialize(db: NanoSQLInstance) {
    // Do nothing...
  }

  private async _create(initializer?: (db: NanoSQLInstance) => Promise<any>): Promise<NanoSQLInstance> {
    const config = <NanoSQLConfig>Object.assign({
      mode: this.adapter
    }, this.nSQLOptions);

    this.log('DatabaseService: creating database');
    this.log('DatabaseService: creating collections');
    let db: NanoSQLInstance = null;
    for (const collection of this.collections) {
      db = nSQL(collection.name).model(collection.schema).config(config);
      await db.connect();
      this[collection.name] = db;
    }

    await this.initialize(db);
    if (initializer) {
      await initializer(db);
    }

    return db;
  }

  private log(message: string) {
    if (!this.production) {
      console.log(message);
    }
  }
}
