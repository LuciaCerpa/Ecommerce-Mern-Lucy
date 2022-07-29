import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    
    title: {
        type: String,
        require: true
    },
    description:{
        type: String,
    },
    quantity:{
        type:Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    categoryId: {
        type: Number, required: true
        // type: mongoose.Schema.ObjectId,
        // ref: 'Category'
    },
    userId: {
        // type: Number,
        // required: true
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        default: 'active'
    }

}, 
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}, 
{
    timestap: true
});

productSchema.virtual('productImgs', {
	ref: 'ProductImg',
	foreignField: 'productId',
	localField: '_id',
});

productSchema.virtual('productsInCart', {
	ref: 'ProductInCart',
	foreignField: 'productId',
	localField: '_id',
});

const Product = mongoose.model("Product", productSchema)

export default Product;
