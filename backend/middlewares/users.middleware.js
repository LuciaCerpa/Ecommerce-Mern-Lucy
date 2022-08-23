// Models
import User from '../models/userModel.js';

// Utils
import AppError from '../utils/appError.util.js';
import catchAsync from '../utils/catchAsync.util.js';

const userExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findById(id);

	if (!user) {
		return next(new AppError('User not found', 404));
	}

	req.user = user;
	next();
});

export default  userExists;
