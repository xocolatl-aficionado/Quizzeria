import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB_URI;

/**
 * The interface that all quiz data sources will adhere to
 */
interface IGetQuizData {
  findQuiz: (id: string) => Promise<Quiz | null>;
  findAllQuizzes: () => Promise<Quiz[] | null>;
  findQuizzesTakenByUser: (name: string) => Promise<Quiz[] | null>;
}

/**
 * Concrete class that implements IGetQuizData and serves up data from MongoDB
 */
export default class MongoQuizData implements IGetQuizData {
  async findQuiz(id: string) {
  const client = new MongoClient(uri);
    var quiz: Quiz | null = null;
  try {
    await client.connect();

    const database = client.db("test");
    const quizzes = database.collection("quizes");

    const query = { subject: id };

    const result = await quizzes.findOne(query);
      quiz = JSON.parse(JSON.stringify(result));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
      return quiz;
  }
}

  async findAllQuizzes() {
  const client = new MongoClient(uri);
    var quizzes: Quiz[] | null = null;
  try {
    await client.connect();

      quizzes = await client
      .db("test")
        .collection<Quiz>("quizes")
      .find({})
      .toArray();
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return quizzes;
    }
  }

  async findQuizzesTakenByUser(name: string) {
    const client = new MongoClient(uri);
    //use an array to populate UserQuizes
    var userQuizzes = Array<UserQuiz>();

    try {
      await client.connect();

      //first get the quiz subjects that the user has taken. Refer: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/project/
      var dummyUser = {
        id: 0,
        name: "dummyname",
        lastname: "dummylastname",
        username: "dummyusername",
        email: "dummyemail",
        password: "dummypassword",
        role: "dummyrole",
        quizzes: [{ subject: "Math", marks: 101 }],
      };

      var dummyQuiz = {
        id: 0,
        name: "TheMathQuiz",
        subject: "Math",
      };
      var user: Student =
        (await client
          .db("test")
          .collection<Student>("users")
          .findOne({ name: name })) ?? dummyUser;
      for (let q in user.quizzes) {
        var quiz: Quiz =
          (await this.findQuiz(user.quizzes[q].subject)) ?? dummyQuiz;
        userQuizzes.push({
          id: quiz.id,
          subject: quiz.subject,
          name: quiz.name,
          marks: user.quizzes[q].marks,
        } as UserQuiz);
      }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
      return userQuizzes;
    }
  }
}
