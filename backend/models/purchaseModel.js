import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },    
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    cartItems: {
        type: Array, 
        required: true
    }

}, {
    timestap: true
});

const Purchase = mongoose.model("Purchase", purchaseSchema)

export default Purchase;
