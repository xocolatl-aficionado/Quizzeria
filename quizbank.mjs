import { default as qs }  from 'querystring';
import { spawn, exec } from 'child_process';
import findAll from './database.js'


export function getQuestion(id)
{

  return findById(id)
}

export default function getAllQuestions()
{
  return findAll()
}

//HTML view of the Quiz
var bigString = `<!DOCTYPE HTML>
<html>

<head>
    <!-- Meta Data -->
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0"/>
    <meta name="description" content="Online Quiz">
    <meta name="keywords" content="Quiz, javascript">
    <meta name="author" content="Ed Brown">
    <title>COMP6905 Quiz</title>
    <!-- Favicon -->
</head>

<body>
<div id="intro">
    <h1>Online Quiz</h1>
</div>
<br>
<div>
    <div><!-- INTRO --></div>
    <form action="/quiz" method="POST">
        <input type="hidden" name="qnumber" value="QNUMBER PLACEHOLDER"/>
        <p>QUESTION PLACEHOLDER 
        <input type="text" size="40" name="qanswer" id="qanswer" />
        </p>
        <br>
        <button type="submit" id="submit">Submit</button>
    </form>
</div>
</body>
</html>`



//Initialising the index of the question as 0 in the start.
var question_index = 0;

//Logic for displaying the question and checking the correctness of the answer for that question.


//  here it will delete the quiz from question bank
//  export let q = Quiz.fetch("bankspec", "quiz id")
//  Quiz.delete("bankspec", "quiz id")

//  here it will delete the quiz id from question bank
//  export let qi = QuizItem.fetch("bankspec", "quizitem id")
//  QuizItem.delete("bankspec", "quizitem id")

//  here it will add the new quiz
//  export let qiadd = new QuizItem("id", "Question", "Answer");
//  qiadd.store("bankspec")

//  export let qadd = new Quiz("id");
//  q.add(qadd);
