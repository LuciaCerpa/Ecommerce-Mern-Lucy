import Purchase from '../models/purchaseModel.js';

export const getAllpurchases= async (req, res)=>{
    try {
        
        const purchases = await Purchase.find();

        res.status(200).send(purchases);

    } catch (error) {
        console.log(error)
    }
}


export const createPurchase= async (req, res)=>{
    try {
            const newPurchase = new Purchase(req.body);
            await newPurchase.save();
            res.send("Purchase Created Successfully!");

    } catch (error) {
        console.log(error)
    }
}

export const updatePurchase= async (req, res)=>{
    try {
            await Purchase.findOneAndUpdate({_id:req.body.purchaseId}, req.body, {new: true})
            res.status(200).json("Purchase Updated Successfully!");
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
}

export const deletePurchase= async (req, res)=>{
    try {
            await Purchase.findOneAndRemove({_id:req.body.purchaseId}, req.body)
            res.status(200).json("Purchase Deleted Successfully!");
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
}
