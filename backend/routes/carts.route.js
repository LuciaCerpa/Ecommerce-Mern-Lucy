import express from "express";
import { 
    getUserCart,
    addProductInCart, 
    updateProductInCart,
    deleteProductFromCart, 
    purchase    
}  from "../controllers/carts.controller.js";


import {protectSession} from '../middlewares/auth.middleware.js';

const cartsRouter = express.Router();

cartsRouter.use(protectSession)
cartsRouter.get("/", getUserCart)
cartsRouter.post("/", addProductInCart)

cartsRouter.patch("/", updateProductInCart)
cartsRouter.delete("/:id", deleteProductFromCart)

cartsRouter.post("/purchase", purchase)

export default cartsRouter;