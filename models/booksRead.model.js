import mongoose from "mongoose";

const Schema = mongoose.Schema
const booksReadSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
    },
    rating: {
        type: Number,
    }
})

export const BooksRead = mongoose.model('read', booksReadSchema, "BooksRead")