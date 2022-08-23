import mongoose from "mongoose";

const productInCartSchema = mongoose.Schema({

    cartId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Cart'
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        default:'active'
    },
    
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}, 
{
    timestap: true
},);


const ProductInCart = mongoose.model("ProductInCart", productInCartSchema)

export default ProductInCart;
