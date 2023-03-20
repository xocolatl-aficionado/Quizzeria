import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.

export async function findById(id) {
  try {
    const uri =
      "mongodb+srv://user:userpass@quizassignmentse.zcvvhsn.mongodb.net/test";
    const client = new MongoClient(uri);
    const database = client.db("QuizTest");
    const questions = database.collection("Questions");

    // Query for a movie that has the title 'The Room'
    const query = { identifier: id };

    const options = {
      //   // sort matched documents in descending order by rating
      //   sort: { "imdb.rating": -1 },
      //   // Include only the `title` and `imdb` fields in the returned document
      //   projection: { _id: 0, title: 1, imdb: 1 },
    };

    const result = await questions.findOne(query, options);
    // since this method returns the matched document, not a cursor, print it directly
    return JSON.parse(JSON.stringify(result));
  } finally {
    await client.close();
  }
}

export default async function findAll() {
  console.log("TEST from database.js");
  const uri =
    "mongodb+srv://user:testuser@quizassignmentse.zcvvhsn.mongodb.net/test";
  const client = new MongoClient(uri);
  try {
    await client.connect();

    const result = await client
      .db("QuizTest")
      .collection("Questions")
      .find({})
      .toArray();

    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
// run().catch(console.dir);
