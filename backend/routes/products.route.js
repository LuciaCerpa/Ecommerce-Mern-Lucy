import express from "express";
import { 
    getAllproducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    addCategory,
    getCategories,
    updateCategory    
}  from "../controllers/products.controller.js";

import productExists from "../middlewares/product.middleware.js";

import categoryExists from "../middlewares/categories.middleware.js";

import {protectSession, protectUserAccount} from '../middlewares/auth.middleware.js';

// import protectUserAccount from "../middlewares/auth.middleware.js";

const productsRouter = express.Router();

productsRouter.get("/", getAllproducts)
productsRouter.get("/:id", productExists, getProductById)

productsRouter.post("/", protectSession, createProduct)

productsRouter.patch("/:id", protectSession,   productExists, updateProduct)
productsRouter.delete("/:id",protectSession,  productExists, deleteProduct)

productsRouter.post("/categories", addCategory)
productsRouter.get("/categories", getCategories)
productsRouter.patch("/categories/:id", categoryExists, updateCategory)

export default productsRouter;