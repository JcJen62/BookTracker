import { Router } from "express";
import { getAllBooksRead,
        postBooksRead,  
        editBooksRead, 
        getAllBooksToRead,
        postBooksToRead} 
    from "../controllers/api.controller.js";


const apiRouter = Router();

apiRouter.get("/booksRead", getAllBooksRead)
apiRouter.post("/booksReadAdd", postBooksRead)
apiRouter.put("/booksReadEdit", editBooksRead)

apiRouter.get("/booksToRead", getAllBooksToRead)
apiRouter.post("/booksToReadAdd", postBooksToRead)

export default apiRouter;