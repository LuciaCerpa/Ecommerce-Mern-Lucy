import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    id:{
        type:Number,
        required: true
    },
    name: {
        type: String,
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

categorySchema.virtual('products', {
	ref: 'Product',
	foreignField: 'categoryId',
	localField: '_id',
});

let Category = mongoose.model("Category", categorySchema)

export default Category;
