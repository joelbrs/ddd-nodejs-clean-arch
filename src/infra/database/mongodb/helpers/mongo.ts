import { Collection, MongoClient } from "mongodb";

export const MongoHelper = {
  client: {} as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url as string);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },
};
