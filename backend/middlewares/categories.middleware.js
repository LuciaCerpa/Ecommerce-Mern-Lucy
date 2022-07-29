// Models
import Category from '../models/productModel.js';

// Utils
import AppError from '../utils/appError.util.js';
import catchAsync from '../utils/catchAsync.util.js';

const categoryExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const category = await Category.findOne({id});

	// const post = await Post.findOne({
	// 	where: { id },
	// 	include: { model: PostImg },
	// });

	if (!category) {
		return next(new AppError('Category not found', 404));
	}

	req.categoryUpdated = category;
	next();
});

export default categoryExists;
