import clientPromise from "../../../lib/mongodb";
import getQuizData from "../../../src/QuizBank.Data/GetData";
export default async (req, res) => {
  try {
    // const client = await clientPromise;
    // const db = client.db("test");

    // const quizzes = await db
    //   .collection("quizes")
    //   .find({ marks: { $exists: true } })
    //   .sort({ marks: -1 })
    //   .toArray();

    console.log("Calling GetAllQuizzes");
    console.log("Type of method: ", typeof getQuizData.GetAllQuizzes);
    var quizzes = await getQuizData.GetAllQuizzes;
    console.log("Result is: ", quizzes);
    res.json(quizzes);
  } catch (e) {
    console.error(e);
  }
};
