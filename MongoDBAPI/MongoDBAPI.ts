import { MongoClient, ServerApiVersion } from "mongodb";
import {
  mongoDBCollection,
  mongoDBName,
  mongoDBUrl,
} from "../utils/consts/mongoDBConstants";

const client = new MongoClient(mongoDBUrl, {
  serverApi: ServerApiVersion.v1,
});

export async function CheckUser(id: number): Promise<boolean> {
  try {
    await client.connect();

    const db = client.db(mongoDBName);
    const collection = db.collection(mongoDBCollection);

    const document = await collection.findOne({ _chatId: id });

    return document !== null;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await client.close();
  }
}

export async function AddUser(id: number): Promise<boolean> {
  try {
    await client.connect();
    const db = client.db(mongoDBName);
    const collection = db.collection(mongoDBCollection);

    const newUser = {
      _chatId: id,
    };

    const result = await collection.insertOne(newUser);
    return result.acknowledged;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await client.close();
  }
}

export async function UpdateUser(id: number, data: any): Promise<boolean> {
  try {
    await client.connect();
    const db = client.db(mongoDBName);
    const collection = db.collection(mongoDBCollection);

    const result = await collection.findOneAndUpdate(
      { _chatId: id },
      { $set: data },
    );

    return result !== null;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await client.close();
  }
}

export async function GetCredentials(id: number): Promise<any> {
  try {
    await client.connect();
    const db = client.db(mongoDBName);
    const collection = db.collection(mongoDBCollection);

    const document = await collection.findOne({ _chatId: id });

    return document;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await client.close();
  }
}
