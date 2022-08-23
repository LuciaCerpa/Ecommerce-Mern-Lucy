import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

import catchAsync from "../utils/catchAsync.util.js";

export const getAllproducts= async (req, res)=>{
    try {
        
        const products = await Product.find();

        res.status(200).send(products);

    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (req, res)=>{
    const {id} = req.params
    try {
        
        const product = await Product.findById(id);

        res.status(200).send(product);

    } catch (error) {
        console.log(error)
    }
}


export const createProduct = catchAsync(async (req, res, next) => {
	const { title, description, price, categoryId, quantity } = req.body;
	const { sessionUser } = req;

    const newProduct = await Product.create({
		title,
		description,
        price,
        categoryId,
        quantity,
		userId: sessionUser.id,
        
	});

    // if (req.files.length > 0) {
	// 	const filesPromises = req.files.map(async file => {
	// 		const imgRef = ref(storage, `products/${Date.now()}_${file.originalname}`);
	// 		const imgRes = await uploadBytes(imgRef, file.buffer);

	// 		return await ProductImg.create({
	// 			productId: newProduct.id,
	// 			img: imgRes.metadata.fullPath,
	// 		});
	// 	});

	// 	await Promise.all(filesPromises);
	// }

	res.status(201).json({
		status: 'success',
		newProduct,
	});
});

export const updateProduct = catchAsync(async (req, res, next) => {
	const { title, description, price, quantity, image } = req.body;
	const { product } = req;

	await product.update({ title, description, price, quantity, image });

	res.status(204).json({ status: 'success' });
});


export const deleteProduct= async (req, res)=>{
    try {
            await Product.findOneAndRemove({_id:req.body.productId}, req.body)
            res.status(200).json("Product Deleted Successfully!");
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
}

export const addCategory = catchAsync(async (req, res, next) => {
	const { id, name } = req.body;
	
	const newCategory = await Category.create({
		id,
		name
	});

	
	res.status(201).json({
		status: 'success',
		newCategory,
	});
});

export const getCategories= async (req, res)=>{
    try {
        
        const categories = await Category.find();

        res.status(200).send(categories);

    } catch (error) {
        console.log(error)
    }
}

export const updateCategory = catchAsync(async (req, res, next) => {
	const { name } = req.body;
	const { categoryUpdated } = req;
console.log(name)
console.log(categoryUpdated)
	await categoryUpdated.update({ name });

	res.status(204).json({ status: 'success' });
});
