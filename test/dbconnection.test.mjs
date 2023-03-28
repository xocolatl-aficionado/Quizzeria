import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import MongoQuizData from "../src/data/dbconnection.js";

describe("MongoQuizData", () => {
  let mongoServer;
  let uri;
  let client;
  let quizData;

  before(async () => {
    // Start an in-memory MongoDB server
    mongoServer = new MongoMemoryServer();
    uri = await mongoServer.getUri();

    // Initialize the MongoQuizData instance
    quizData = new MongoQuizData();

    // Connect to the in-memory MongoDB server and populate the "quizzes" and "users" collections
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    await db.collection("quizzes").insertMany([
      { id: 1, name: "Quiz1", subject: "Math" },
      { id: 2, name: "Quiz2", subject: "Science" },
    ]);
    await db.collection("users").insertOne({
      id: 1,
      name: "John",
      lastname: "Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "password",
      role: "student",
      quizzes: [
        { subject: "Math", marks: 80 },
        { subject: "Science", marks: 90 },
      ],
    });
  });

  after(async () => {
    // Close the client and stop the in-memory MongoDB server
    await client.close();
    await mongoServer.stop();
  });

  describe("findQuiz", () => {
    it("should return a quiz object when given a valid id", async () => {
      const quiz = await quizData.findQuiz("Math");
      expect(quiz).to.deep.equal({ id: 1, name: "Quiz1", subject: "Math" });
    });

    it("should return null when given an invalid id", async () => {
      const quiz = await quizData.findQuiz("InvalidSubject");
      expect(quiz).to.be.null;
    });
  });

  describe("findAllQuizzes", () => {
    it("should return an array of quiz objects", async () => {
      const quizzes = await quizData.findAllQuizzes();
      expect(quizzes).to.have.lengthOf(2);
      expect(quizzes[0]).to.deep.equal({
        id: 1,
        name: "Quiz1",
        subject: "Math",
      });
      expect(quizzes[1]).to.deep.equal({
        id: 2,
        name: "Quiz2",
        subject: "Science",
      });
    });
  });

  describe("findQuizzesTakenByUser", () => {
    it("should return an array of UserQuiz objects when given a valid user name", async () => {
      const userQuizzes = await quizData.findQuizzesTakenByUser("John");
      expect(userQuizzes).to.have.lengthOf(2);
      expect(userQuizzes[0]).to.deep.equal({
        id: 1,
        name: "Quiz1",
        subject: "Math",
        marks: 80,
      });
      expect(userQuizzes[1]).to.deep.equal({
        id: 2,
        name: "Quiz2",
        subject: "Science",
        marks: 90,
      });
    });
  });
});
