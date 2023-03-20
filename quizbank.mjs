import { default as qs }  from 'querystring';
import { spawn, exec } from 'child_process';
import findAll from './database.js'

//TODO:
//1. make Quiz, QuizItem, MUTLIPLECHOICEQuizItem
//2. Populate the above types by reading from mongo database

export function getQuestion(id)
{

  return findById(id)
}

export default function getAllQuestionsForSingleQuiz()
{
  return findAll()
  //change to something like:
  //var quiz = new Quiz("id")
  //for(every item in findAll()):
      //const question =  new QuizItem(item)
      //quiz.add(question)

  //return quiz that has questions in it
}

//make Quiz object

//fields
//id (int) 
//questions ([QuizItem..])

//methods
//.add()


//.remove()
//....

//store()

//fetch (static)
//delete (static)


//---------------------------------------------//
//make QuizItem object (QuizItem is a single question)

//fields
//id (int) 
//question (string)
//answer (string)




//methods

//correct()

//store()

//fetch (static)
//delete (static)

//-------------------------------------------//
//make MUTLIPLECHOICEQuizItem object (QuizItem is a single question of multiple chice type])
//fields
//id (int) 
//question (string)
//answer (string)
//options ([string]) --> only difference between  MUTLIPLECHOICEQuizItem object and QuizItem object




//methods

//store()

//fetch (static)
//delete (static)

//----------------------------------------//

//make MUTLIPLEANSWERQuizItem object (QuizItem is a single question of multiple chice type])
//fields
//id (int) 
//question (string)
//answer ([string]) --> difference between  MUTLIPLECHOICEQuizItem object and MUTLIPLEANSWERQuizItem object
//options ([string]) --> difference between  MUTLIPLECHOICEQuizItem object, MUTLIPLEANSWERQuizItem object and QuizItem object 




//methods

//store()

//fetch (static)
//delete (static)

//----------------------------------------//