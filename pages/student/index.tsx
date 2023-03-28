// Import required modules and components
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../../components/studentNavbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import QuizTable from "../../components/studentHomeTable";
import { Box } from "@chakra-ui/react";
import clientPromise from "../../src/lib/mongodb";
import Quiz from "../../src/business/models/Quiz";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { getSession } from 'next-auth/react'

// Define a server-side function that retrieves the quizzes for the current user
export async function getServerSideProps({ req }) {
  try {

    // Get the current user's session
    const session = await getSession({ req });

    // Get the user's name from the session
    const dbUser = session?.user?.name;

    // Create a MongoDB client
    const client = await clientPromise;
    // Get the 'test' database
    const db = client.db("test");

    // Find the user in the 'users' collection
    const user = await db
      .collection("users")
      .findOne({ "name": dbUser })

    // Get the user's quizzes
    const quizzes = user?.quizzes;
      
    // Process the user's quizzes
    const userQuizzes = [];
    for (const quiz of quizzes) {
      const tempQuiz =
      { 
        quiz: await db
        .collection('quizes').findOne({_id: quiz.quiz}),
        marks: quiz.marks
      }
      
      // Convert the quiz ID to a string
      let _id =  tempQuiz.quiz._id.toString();
      
       // Replace the quiz ID with the string version
       tempQuiz.quiz._id = _id; 
       // Add the processed quiz to the list of user quizzes
       userQuizzes.push(tempQuiz)
    } 
    
    // Return the user quizzes as props
    return {
      props: { quizzes: userQuizzes },
    };
  } catch (e) {
    console.error(e);
    return {
      props: []
    };
  }
}


// Define an interface for the props that the component expects to receive
type StudentHomePropsInterface = {
  quizzes: Array<{
    [key in string]: string;
  }>;
};

export default function StudentHome({ quizzes }: StudentHomePropsInterface) {

  const router = useRouter();
  const { data: session, status } = useSession();

  const userRole = (session: any) => {
    let role = session?.user?.role;
    if (role) return role;
    return null;
  };

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status]);

  if (status === "authenticated") {
    var role: any = userRole(session);

    if (role == "admin") {
      router.replace("/admin");
    } else if (role == "student") {
      return (
        <>
          <Head>
            <title>Quiz App</title>

            <meta name="description" content="Quiz App Home for students" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ChakraProvider>
            <Box minHeight="100vh" display="flex" flexDirection="column">
              <NavBar />
              <Box justifyContent="center">
                <Card />
              </Box>
              <Box flex="1" width="80%" mx="auto" justifyContent="center">
                <QuizTable quizzes={quizzes} />
              </Box>
              <Footer />
            </Box>
          </ChakraProvider>
        </>
      );
    }
  }
}
