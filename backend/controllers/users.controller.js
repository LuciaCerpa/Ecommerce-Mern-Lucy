import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

import User from "../models/userModel.js";

import CatchAsync from '../utils/catchAsync.util.js'
import AppError from '../utils/appError.util.js'
import Email from '../utils/email.util.js'

dotenv.config({ path: './config.env' });

export const loginController = CatchAsync(async (req, res, next)=>{
    const { email, password } = req.body;

	// Validate credentials (email)
	const user = await User.findOne({
		email,
		status: 'active',
	});
console.log(user)

	if (!user) {
		return next(new AppError('Credentials invalid, please try again!', 400));
	}

	// Validate password
	const isPasswordValid = bcrypt.compare(password, user.password);
	
	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}
	
	// Generate JWT (JsonWebToken) ->
	const auth = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		auth,
		user,
	});
        })


export const getAllUserProducts = CatchAsync(async (req, res)=>{
	const {id} =req.params
    const user = await User.findOne({ _id:id, status: 'active' }, '-password')
		 .populate({
		 	path: 'products',
		 	match: { status: 'active' },})
		// 	populate: { path: 'carts', match: { status: 'active' } },
		// })
		// .populate('products');

	res.status(200).json({
		status: 'success',
		user,
	});
});


export const createUser = CatchAsync(async (req, res, next)=>{
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

	if (userExists) {
		return next(new AppError('Email already taken', 400));
	}

    const salt = await bcrypt.genSalt(12);
	const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  // Remove password from response
  newUser.password = undefined;

  await new Email(email).sendWelcome(name);

  res.status(201).json({ 
    status: 'success', 
    newUser 
});
});


export const updateUser= async (req, res)=>{
    const { user } = req;
	const { name, email } = req.body;

	await user.update({ name, email });

	res.status(204).json({ status: 'success' });}

export const deleteUser = CatchAsync(async (req, res, next) => {
	const { user } = req;

	await user.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

