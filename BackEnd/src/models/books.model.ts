import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    author_id:{

        type:Number,
        // type:mongoose.Schema.Types.ObjectId,
        // ref:'Author'
    },
    genre:{
        type:String,
        required:true
    }

})

const Book = mongoose.model('Book', booksSchema);

export {Book}; 

