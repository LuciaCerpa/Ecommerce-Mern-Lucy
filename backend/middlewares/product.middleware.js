// Models
import Product from '../models/productModel.js';
import ProductImg from '../models/productImgModel.js';

// Utils
import AppError from '../utils/appError.util.js';
import catchAsync from '../utils/catchAsync.util.js';

const productExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const product = await Product.findById(id);

	// const post = await Post.findOne({
	// 	where: { id },
	// 	include: { model: PostImg },
	// });

	if (!product) {
		return next(new AppError('Product not found', 404));
	}

	req.product = product;
	next();
});

export default productExists;
