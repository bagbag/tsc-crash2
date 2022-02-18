import { Collection } from 'mongodb';
import type { OptionalUnlessRequiredId } from 'mongodb';

export type MongoDocument<T> = OptionalUnlessRequiredId<Omit<T, 'id'> & { _id: string }>;

export type MongoDocumentWithPartialId<T> = OptionalUnlessRequiredId<Omit<T, 'id'> & { _id?: string }>;

export declare function toProjectedEntity<T extends Entity>(document: MongoDocumentWithPartialId<T>): any;

export class MongoBaseRepository<T extends Entity> {
  readonly collection: Collection<any>;

  async loadManyProjectedByFilter(): Promise<any> {
    const documents = await this.collection.find<MongoDocument<T>>({}).toArray();
    return [documents.map(toProjectedEntity)];
  }
}
