import jwt from 'jsonwebtoken';
import dotenv from  'dotenv';

// Models
import User from '../models/userModel.js';

// Utils
import catchAsync from '../utils/catchAsync.util.js';
import AppError from '../utils/appError.util.js';

dotenv.config({ path: './config.env' });

export const protectSession = catchAsync(async (req, res, next) => {
	let auth;

	// Extract the token from headers
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		auth = req.headers.authorization.split(' ')[1];
	}

	if (!auth) {
		return next(new AppError('Invalid session', 403));
	}

	// Ask JWT (library), if the token is still valid
	const decoded = await jwt.verify(auth, process.env.JWT_SECRET);
	// { id, ... }

	// Check in db that user still exists
	const user = await User.findOne({
		_id: decoded.id,
		status: 'active',
	});

	if (!user) {
		return next(
			new AppError('The owner of this token doesnt exist anymore', 403)
		);
	}

	// Grant access
	req.sessionUser = user;
	next();
});

export const protectUserAccount = (req, res, next) => {
	// const { id } = req.params -> Alternative
	const { sessionUser, user } = req;

	// If the id's don't match, return error (403)
	if (!sessionUser._id.equals(user._id)) {
		return next(new AppError('You do not own this account', 403));
	}

	next();
};

