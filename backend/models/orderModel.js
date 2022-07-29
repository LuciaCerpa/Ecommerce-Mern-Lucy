import mongoose from "mongoose";

const orderSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    cartId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Cart'
    },
    totalPrice: {
        type: parseFloat,
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
});

const Order = mongoose.model("Order", orderSchema)

export default Order;
