import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB_URI;

/**
 * Get a quiz by it's subject
 */
export async function findQuiz(id) {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    const database = client.db("test");
    const quizzes = database.collection("quizes");

    // Query for a movie that has the title 'The Room'
    const query = { subject: id };

    const result = await quizzes.findOne(query);
    return JSON.parse(JSON.stringify(result));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

/**
 * Get all quizzes
 */
export default async function findAllQuizzes() {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    const result = await client
      .db("test")
      .collection("quizes")
      .find({})
      .toArray();

    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
