import { useState } from "react";
import {
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Stack,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { Global } from "@emotion/react";

type Question = {
  id: string;
  text: string;
};

type Answer = {
  questionId: string;
  value: string;
};

const questions: Question[] = [
  {
    id: "1",
    text: "What is your name before the marriage if you are married ?",
  },
  {
    id: "2",
    text: "What is your favorite color?",
  },
  {
    id: "3",
    text: "What is your favorite food?",
  },
  {
    id: "4",
    text: "What is your favorite animal?",
  },
  {
    id: "5",
    text: "What is your favorite book?",
  },
  {
    id: "6",
    text: "What is your favorite book when you were in high school and still willing to read?",
  },
  {
    id: "7",
    text: "What is your favorite animal?",
  },
  {
    id: "8",
    text: "What is your favorite book?",
  },
  {
    id: "6",
    text: "What is your favorite food?",
  },
  {
    id: "9",
    text: "What is your favorite animal?",
  },
  {
    id: "10",
    text: "What is your favorite book?",
  },
];

const PAGE_SIZE = 3;

export default function shortAnswerQuestions() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Answers:", answers);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionId: string
  ) => {
    const newAnswer = { questionId, value: event.target.value };
    const existingAnswer = answers.find((a) => a.questionId === questionId);

    if (existingAnswer) {
      setAnswers((prevState) =>
        prevState.map((a) => (a.questionId === questionId ? newAnswer : a))
      );
    } else {
      setAnswers((prevState) => [...prevState, newAnswer]);
    }
  };

  const totalPages = Math.ceil(questions.length / PAGE_SIZE);

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentQuestions = questions.slice(startIndex, endIndex);
  return (
    <Flex>
      <Global
        styles={`
        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            pointer-events: auto;
            cursor: pointer;
            list-style:none;s
          }
          
          ::marker {
            list-style: none;
            display:none;
          }

          .pagination li a{
            display: inline-block;
            margin: 0 10px;
            border: 1px solid orange;
            padding: 10px;
            border-radius:5px;
            background-color:#FFFFCE;
            cursor: pointer;
            pointer-events: auto;
            font-weight:bold;
          }


          .pagination li a.active{
            color: black;
            bg-color:orange;
          }

          .pagination li.hover{
            background-color:orange;
          }

          .pagination li.clicked{
            background-color:orange;
            color:orange;
          }

          .pagination__link--active {
            color: #DD6B20;
          }

          .pagination__link--disabled {
            opacity: 0.5;
            pointer-events: none;
          }
        `}
      />
      <VStack spacing={10} align={"stretch"} justify={"center"}>
        <form onSubmit={handleSubmit}>
          {currentQuestions.map((q) => (
            <Box
              key={q.id}
              bg="#F2F2E4"
              p={4}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
              marginTop={"3"}
            >
              <FormControl>
                <FormLabel>
                  Question {q.id}: {q.text}
                </FormLabel>
                <Input
                  bgColor={"white"}
                  type="text"
                  width={"250px"}
                  value={
                    answers.find((a) => a.questionId === q.id)?.value || ""
                  }
                  onChange={(e) => handleChange(e, q.id)}
                />
              </FormControl>
            </Box>
          ))}
          <Flex justifyContent="center" mt={10}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={totalPages}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </Flex>
          <Flex justifyContent="center" mt={10}>
            <Button type="submit" colorScheme="orange" mt={4} mr={5}>
              Save
            </Button>
            <Button type="submit" colorScheme="orange" mt={4}>
              Submit
            </Button>
          </Flex>
        </form>
      </VStack>
    </Flex>
  );
}
