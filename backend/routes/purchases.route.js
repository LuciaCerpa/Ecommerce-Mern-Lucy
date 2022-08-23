import express from "express";
import { getAllpurchases, createPurchase, updatePurchase, deletePurchase }  from "../controllers/purchases.controller.js";

const purchasesRouter = express.Router();

purchasesRouter.get("/", getAllpurchases)
purchasesRouter.post("/", createPurchase)
purchasesRouter.patch("/", updatePurchase)
purchasesRouter.delete("/", deletePurchase)

export default purchasesRouter;