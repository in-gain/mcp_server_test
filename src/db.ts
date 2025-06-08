import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI ?? "mongodb://localhost:27017";
export const dbPromise = new MongoClient(uri).connect()
  .then(c => c.db(process.env.DB_NAME ?? "mcp_todo"));
