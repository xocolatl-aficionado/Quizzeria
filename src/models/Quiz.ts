import mongoose, { Schema, model, Model, Document } from "mongoose";

export interface IQuiz extends Document{

    quiztopic:string,
    question: string,
    answer: string,
    options?: string[]
}

const QuizSchema:Schema = new Schema({

    quiztopic:{
        type:String
    },

    question: {
        type: String
    },

    answer: {
        type: String
    },

    options:{
        type: []
    }
})

export const Quiz = (mongoose.models.Quiz ||
     model('Student', QuizSchema)) as Model<IQuiz>