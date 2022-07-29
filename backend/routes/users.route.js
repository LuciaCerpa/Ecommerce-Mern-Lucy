import express from "express";
import { getAllUserProducts, createUser, updateUser, deleteUser, loginController }  from "../controllers/users.controller.js";

import createUserValidations from '../middlewares/validations.middleware.js';
import userExists from '../middlewares/users.middleware.js';
import {
	protectSession,
	protectUserAccount,
} from '../middlewares/auth.middleware.js'

const usersRouter = express.Router();

usersRouter.post("/login", loginController)

usersRouter.post("/", createUserValidations, createUser)

usersRouter.use(protectSession)
usersRouter.get("/:id", userExists, getAllUserProducts)

usersRouter.patch("/:id", userExists, protectUserAccount, updateUser)
usersRouter.delete("/:id", userExists, protectUserAccount, deleteUser)

export default usersRouter;