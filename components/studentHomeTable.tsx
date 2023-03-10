import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Center,
} from "@chakra-ui/react";
import Quiz from "../src/models/Quiz";

interface QuizProps {
  quizzes: Array<Quiz>;
}

export default function QuizTable({ quizzes }: QuizProps) {
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Quiz Name</Th>
          <Th>Subject</Th>
          <Th>Quiz Type</Th>
          <Th>Marks</Th>
          <Th textAlign={"right"}></Th>
        </Tr>
      </Thead>
      <Tbody>
        {quizzes.map((quiz) => (
          <Tr key={quiz.id}>
            <Td>{quiz.name}</Td>
            <Td>{quiz.subject}</Td>
            <Td>{quiz.type}</Td>
            <Td>{quiz.marks}</Td>
            <Td textAlign={"right"}>
              <Button colorScheme="orange">Retake Quiz</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

