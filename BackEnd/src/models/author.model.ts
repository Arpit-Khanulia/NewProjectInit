import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    birth_year:{
        type:String,
        required:true
    }
})


const Author = mongoose.model('Author',authorSchema);
export {Author}; 

