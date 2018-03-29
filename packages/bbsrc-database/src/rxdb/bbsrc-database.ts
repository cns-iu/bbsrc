import RxDB from 'rxdb';
import { RxDocument } from 'rxdb';
import RxDBValidateModule from 'rxdb/plugins/validate';
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';

import * as IDBAdapter from 'pouchdb-adapter-idb';
import * as WebSQLAdapter from 'pouchdb-adapter-node-websql';
import * as MemoryAdapter from 'pouchdb-adapter-memory';

import { RxBBSRCDatabase } from './rxdb-types.d';
import { PublicationSchema } from './publication.schema';

export class BBSRCDatabase {
  private static dbPromise: Promise<RxBBSRCDatabase> = null;

  collections: any[] = [
    { name: 'publication', schema: PublicationSchema }
  ];

  adapters: any = {
    'idb': IDBAdapter,
    'websql': WebSQLAdapter,
    'memory': MemoryAdapter
  };

  constructor(private production?: boolean, private adapter: string = 'memory', private rxdbOptions: any = {}) {
    this.setupPlugins();
  }

  get(): Promise<RxBBSRCDatabase> {
    if (!BBSRCDatabase.dbPromise) {
      BBSRCDatabase.dbPromise = this._create();
    }
    return BBSRCDatabase.dbPromise;
  }

  public async initializeCollection(collection: string, data: any[]) {
    const db = await this.get();
    const coll = db[collection];
    if ((await coll.find().limit(1).exec()).length === 0) {
      await Promise.all(data.map((item) => coll.insert(item)));
    }
    const results = (await coll.find().exec()).length;
    this.log(`${collection}: ${results}`);
  }

  private async initialize(db: RxBBSRCDatabase) {
    // Do nothing...
  }

  private async _create(): Promise<RxBBSRCDatabase> {
    this.log('DatabaseService: creating database');
    const db: RxBBSRCDatabase = await RxDB.create(Object.assign({
      name: 'bbsrc',
      adapter: this.adapter
    }, this.rxdbOptions));
    this.log('DatabaseService: creating collections');
    await Promise.all(this.collections.map(colData => db.collection(colData)));
    await this.initialize(db);

    return db;
  }

  private setupPlugins() {
    if (!this.production) {
      // schema-checks should be used in dev-mode only
      RxDB.plugin(RxDBSchemaCheckModule);
    }
    RxDB.plugin(RxDBValidateModule);
    RxDB.plugin(this.adapters[this.adapter] || MemoryAdapter);

    RxDB.QueryChangeDetector.enable(true);
    if (!this.production) {
      RxDB.QueryChangeDetector.enableDebugging();
    }
  }

  private log(message: string) {
    if (!this.production) {
      console.log(message);
    }
  }
}