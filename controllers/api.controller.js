import { BooksRead } from '../models/booksRead.model.js'
import { BooksToRead } from '../models/booksToRead.model.js'
import { v4 as uuidv4 } from 'uuid';

// Start BooksRead
export const getAllBooksRead = async (req, res) => {
    try {
        const bookRead = await BooksRead.find().lean().exec()
        res.status(200).json(bookRead)
    }
    catch (err) {
        console.log(err)
    }
    
}

export const postBooksRead = (req, res) => {
    const newBookRead = new BooksRead({
        name: req.body.name,
        rating: 0,
        id: uuidv4()
    })
    try{
        console.log(req.body)
        newBookRead.save();
        res.status(200).json({Message: "Book added successfully!"})
    }
    catch (err){
        res.status(400).json({Message: "Book not added"})
    }
}


export const editBooksRead = async (req, res) => {
    let book = {
        id: req.body.id,
        rating: req.body.rating,
    }
    try {
        console.log(req.body)
        const edit = await BooksRead.findOneAndUpdate({ id: req.body.id }, book)
        res.status(200).json({ Message: "Updated rating"})
    }
    catch (err){
        res.status(400).json({ Message: "Couldn't update rating"})
    }
}

//Start Books to Read
export const getAllBooksToRead = async (req, res) => {
    try {
        const bookToRead = await BooksToRead.find().lean().exec()
        res.status(200).json(bookToRead)
    }
    catch (err) {
        console.log(err)
    }
    
}

export const postBooksToRead = (req, res) => {
    const newBookToRead = new BooksToRead({
        name: req.body.name,
    })
    try{
        newBookToRead.save();
        res.status(200).json({Message: "Book added successfully!"})
    }
    catch (err){
        res.status(400).json({Message: "Book not added"})
    }
}