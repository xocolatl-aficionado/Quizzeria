//REFERRED: https://github.com/cheesasaurus/example-typescript-and-mocha

import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import MongoQuizData from "../src/data/dbconnection";
import { assert } from "chai"; // Using Assert style
import { expect } from "chai"; // Using Expect style
import { should } from "chai"; // Using Should style

describe("MongoQuizData", () => {
  let mongo;
  let uri;
  let client;
  let quizData;

  before(async () => {
    // Start an in-memory MongoDB server
    //mongo = await MongoMemoryServer.create();
    const uri =
      "mongodb+srv://team_h:B8131nOFQ2jUyuZ2@quizzapp.mvgmqt5.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    // Initialize the MongoQuizData instance
    quizData = new MongoQuizData();

    // Connect to the in-memory MongoDB server and populate the "quizzes" and "users" collections
    await client.connect();
    const db = client.db();
    await db.collection("testquizzes").insertMany([
      { name: "Quiz1", subject: "Math" },
      { name: "Quiz2", subject: "Science" },
    ]);
    await db.collection("testusers").insertOne({
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
    //await client.close();
    //await mongo.stop();
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

  // describe("findQuizzesTakenByUser", () => {
  //   it("should return an array of UserQuiz objects when given a valid user name", async () => {
  //     const userQuizzes = await quizData.findQuizzesTakenByUser("John");
  //     expect(userQuizzes).to.have.lengthOf(2);
  //     expect(userQuizzes[0]).to.deep.equal({
  //       id: 1,
  //       name: "Quiz1",
  //       subject: "Math",
  //       marks: 80,
  //     });
  //     expect(userQuizzes[1]).to.deep.equal({
  //       id: 2,
  //       name: "Quiz2",
  //       subject: "Science",
  //       marks: 90,
  //     });
  //   });
  // });
});
