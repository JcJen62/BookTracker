import mongoose from "mongoose";

const Schema = mongoose.Schema
const booksToReadSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
    }
})

export const BooksToRead = mongoose.model('toRead', booksToReadSchema, "BooksToRead")