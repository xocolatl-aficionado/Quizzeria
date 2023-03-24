import MongoQuizData from "../../src/utils/dbconnection";

export async function getServerSideProps() {
  var qd = new MongoQuizData();
  let quizzes = await qd.findAllQuizzes();
  console.log("All Quizzes retrieved: ", quizzes);

  let oneQuiz = await qd.findQuiz("Math");
  console.log("One Quiz retrieved: ", oneQuiz);
  return {
    props: {}, // will be passed to the page component as props
  };
}


export default function DemoHome() {
  return <h1>My Page</h1>;
}
