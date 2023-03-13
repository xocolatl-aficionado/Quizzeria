import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://user:userpass@quizassignmentse.zcvvhsn.mongodb.net/test";

const client = new MongoClient(uri);

export async function findById(id) {
  try {
    const database = client.db("QuizTest");
    const questions = database.collection("Questions");

    // Query for a movie that has the title 'The Room'
    const query = {identifier:id};

    const options = {
    //   // sort matched documents in descending order by rating
    //   sort: { "imdb.rating": -1 },
    //   // Include only the `title` and `imdb` fields in the returned document
    //   projection: { _id: 0, title: 1, imdb: 1 },
    };

    const result = await questions.findOne(query, options);
    // since this method returns the matched document, not a cursor, print it directly
    return JSON.parse(JSON.stringify(result))
  } finally {
    await client.close();
  }
}

export default async function findAll() {
    console.log("TEST from database.js")
    try{
        let clientMongo = await client.connect()
    
    
      const database =  clientMongo.db("QuizTest");
      const questions = database.collection("Questions");
  
    console.log("Going to call find{}")
  
      const result = await questions.find({}).toArray();
      console.log("from db")
        console.log(result)
      return result
    }
    catch(err){
        console.err(err)
    }
    
    
  }
// run().catch(console.dir);
