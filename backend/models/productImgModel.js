import mongoose from "mongoose";

const productImgSchema = mongoose.Schema({

    img: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'    },
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

const ProductImg = mongoose.model("ProductImg", productImgSchema)

export default ProductImg;
