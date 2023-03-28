/**
 * The interface that all quiz data sources will adhere to
 */
export default interface IGetQuizData {
  findQuiz: (id: string) => Promise<Quiz | null>;
  findAllQuizzes: () => Promise<Quiz[] | null>;
  findQuizzesTakenByUser: (name: string) => Promise<Quiz[] | null>;
}
