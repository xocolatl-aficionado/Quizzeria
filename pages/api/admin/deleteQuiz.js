import MongoQuizData from "../../../src/data/dbconnection";


export default async (req, res) => {

  try {
    var qd = new MongoQuizData();
    console.log(req.body.subject)
    const deleteQuiz = await qd.deleteQuiz(req.body.subject)
    const setQuesSubNull = await qd.setQuestionSubNull(req.body.subject)
    res.status(200).json();
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }

};