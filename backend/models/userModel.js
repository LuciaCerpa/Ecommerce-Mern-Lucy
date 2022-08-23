import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default:'normal'
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

userSchema.virtual('products', {
	ref: 'Product',
	foreignField: 'userId',
	localField: '_id',
});

userSchema.virtual('carts', {
	ref: 'Cart',
	foreignField: 'userId',
	localField: '_id',
});

userSchema.virtual('orders', {
	ref: 'Order',
	foreignField: 'userId',
	localField: '_id',
});


const User = mongoose.model("User", userSchema)

export default User;
