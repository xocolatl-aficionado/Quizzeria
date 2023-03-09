import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../../components/studentNavbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import QuizTable from "../../components/studentHomeTable";
import { Box } from "@chakra-ui/react";
import clientPromise from "../../lib/mongodb";

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const quizes = await db
      .collection("quizes")
      .find({})
      .sort({ marks: -1 })
      .toArray();

    return {
      props: { quizes: JSON.parse(JSON.stringify(quizes)) },
    };
  } catch (e) {
    console.error(e);
  }
}

export default function StudentHome({ quizes }) {
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
            <QuizTable quizes={quizes} />
          </Box>
          <Footer />
        </Box>
      </ChakraProvider>
    </>
  );
}
