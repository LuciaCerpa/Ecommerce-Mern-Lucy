import mongoose from "mongoose";

const cartSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        default:'active'
    }

},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}, 
{
    timestap: true
});

cartSchema.virtual('orders', {
	ref: 'Order',
	foreignField: 'cartId',
	localField: '_id',
});

cartSchema.virtual('productsInCart', {
	ref: 'ProductInCart',
	foreignField: 'cartId',
	localField: '_id',
});

const Cart = mongoose.model("Cart", cartSchema)

export default Cart;
