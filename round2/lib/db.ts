import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  return MongoClient.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}
