import { Publication } from '../shared/publication';

import { RxDocument, RxCollection, RxDatabase } from 'rxdb';

export type RxPublicationDocument = RxDocument<Publication>;

declare class RxPublicationCollection extends RxCollection<Publication> { }

export class RxBBSRCDatabase extends RxDatabase {
  publication?: RxPublicationCollection;
}
