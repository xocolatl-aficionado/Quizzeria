import { WithId, ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export interface IQuiz {
  id: ObjectId;
  name: string;
  type: string;
  marks: number;
  subject: string;
}

interface IGetData {
  GetAllQuizzes: () => Promise<WithId<Document>[]>;
  GetAllMarkedQuizzes: () => Promise<WithId<Document>[]>;
}

export default class GetData implements IGetData {
  database = "test";
  collection = "quizes";
  // private static instance: GetData;
  //this.client = await this.connect();

  // async static getInstance(): GetData {

  //     if (!GetData.instance) {
  //         GetData.instance = new GetData(mongoDbClient);
  //     }
  //     return GetData.instance;
  // }

  GetAllQuizzes = async () => {
    const client = await clientPromise;
    const db = client.db(this.database);

    const quizzes = db
      .collection(this.collection)
      .find({})
      .sort({ marks: -1 })
      .toArray();
    console.log("QUIZES RETURNED: ", quizzes);
    return quizzes;
  };

  GetAllMarkedQuizzes = async () => {
    const client = await clientPromise;
    const db = client.db(this.database);

    const quizzes = await db
      .collection(this.collection)
      .find({ marks: { $exists: true } })
      .sort({ marks: -1 })
      .toArray();

    return quizzes;
  };
}

// export function getQuizData(): IGetData {
//   return new GetData();
// }
//export const QuizData = () => new GetData();
