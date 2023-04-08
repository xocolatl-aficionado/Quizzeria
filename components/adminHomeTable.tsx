/**
 * Designing a table view for Admins to display their current quizzes
 */
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import {AdminQuizList}  from "../src/business/models/Quiz";

/**
 * Interface props to define the Quiz using the types defined in tpes/admin_quiz file.
 */
interface QuizBankProps {
  quizzes: AdminQuizList[];
}

const handleClick = (value)  => {
  console.log(value)
};

/**
 * To define the table and map it with the quiz data object
 * @param param0 : Quiz object created with the types for loading data
 * @returns a table of quiz data related to the admin
 */
const QuizTable =  ({ quizzes }: QuizBankProps) => {
  console.log({ quizzes })
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Quiz Name</Th>
          <Th>Subject</Th>
          <Th>Quiz Type</Th>
          <Th>Marks</Th>
          <Th>Time</Th>
          <Th>Quiz Takers</Th>
          <Th>Attempts</Th>
          <Th textAlign={"right"}></Th>
          <Th textAlign={"right"}></Th>
        </Tr>
      </Thead>
      <Tbody>
        {quizzes.quiz.map((quiz) => (
          <Tr key={quiz.id}>
            <Td>{quiz.name}</Td>
            <Td>{quiz.subject}</Td>
            <Td>{quiz.type}</Td>
            <Td>{quiz.maxMarks}</Td>
            <Td>{quiz.time}</Td>
            <Td>{quiz.quizTakers}</Td>
            <Td>{quiz.attempts}</Td>
            <Td textAlign={"right"}>
              <Button colorScheme="orange">Edit</Button>
            </Td>
            <Td textAlign={"right"}>
              <Button colorScheme="orange" onClick={() => handleClick(quiz.subject)}>Delete</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};


export default QuizTable;
