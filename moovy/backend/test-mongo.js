import { MongoClient } from "mongodb"; // si package.json a "type": "module"

const client = new MongoClient("mongodb://localhost:27017");
try {
  await client.connect();
  console.log("MongoDB connecté !");
} catch (err) {
  console.error("Erreur MongoDB :", err);
} finally {
  await client.close();
}
