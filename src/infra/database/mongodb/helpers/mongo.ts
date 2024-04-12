import { MongoClient } from "mongodb";

export const MongoHelper = {
  client: {} as MongoClient,

  async connect(url: string) {
    this.client = await MongoClient.connect(url as string);
  },
  async disconnect() {
    await this.client.close();
  },
};
