import Cart from "../models/cartModel.js"
import {ObjectId} from 'mongodb';
import Product from "../models/productModel.js";
import AppError from "../utils/appError.util.js";
import Email from "../utils/email.util.js";

import catchAsync from "../utils/catchAsync.util.js";
import ProductInCart from './../models/productInCartModel.js';


export const getUserCart = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
  
    const cart = await Cart.find( { userId: sessionUser.id, status: 'active'})
    .populate({ 
          path: 'productsInCart',
          match: { status: 'active' },
          populate: { path: 'productId' },
        });      
     
    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }
  
    res.status(200).json({ status: 'success', cart });
  });


export const addProductInCart = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const { productId, quantity } = req.body;
 
    // Validate input qty
  
    const product = await Product.findOne({id:productId, status:'active'});
   
    if (!product) {
      return next(new AppError('Invalid product', 404));
    } else if (quantity > product.quantity) {
      return next(
        new AppError(
          `This product only has ${product.quantity} items available`,
          400
        )
      );
    }
    // else{
    //   productTotal= product.quantity - quantity
    //   await product.update({ quantity:productTotal });
     
    // }
    // Check if cart exists
    const cart = await Cart.findOne( { status: 'active', userId: sessionUser.id },
    );
  
    if (!cart) {
      // Create new cart for user
      const newCart = await Cart.create({ userId: sessionUser.id });
  
      // Add product to newly created cart
      await ProductInCart.create({
        cartId: newCart.id,
        productId,
        quantity,
      });
    } else {
      // Cart already exists
      // Check if product already exists in cart
      const productExists = await ProductInCart.findOne( { cartId: cart.id, productId});
  
      if (productExists) {
        next(new AppError('Product is already in the cart', 400));
        if(productExists.status === 'deleted'){
          productExists.update({status:'active'})
        }
      }
  
      await ProductInCart.create({ cartId: cart.id, productId, quantity });
    }
  
    res.status(200).json({ status: 'success' });
  });
  
 export const updateProductInCart = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const { productId, newQty } = req.body;
  
    // Validate input qty
    const product = await Product.findOne({ id: productId, status: 'active'});
  
    if (!product) {
      return next(new AppError('Invalid product', 404));
    } else if (newQty > product.quantity) {
      return next(
        new AppError(
          `This product only has ${product.quantity} items available`,
          400
        )
      );
    }
  
    const cart = await Cart.findOne({ userId: sessionUser.id, status: 'active' });
  
    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }
  
    const productInCart = await ProductInCart.findOne({
      cartId: cart.id,
      productId,
      status: 'active',
    });
  
    if (!productInCart) {
      return next(new AppError('Product not found in cart', 404));
    }
  
    if (newQty <= 0) {
      await productInCart.update({ quantity: 0, status: 'deleted' });
    } else if (newQty > 0) {
      await productInCart.update({ quantity: newQty });
    }
  
    res.status(200).json({ status: 'success' });
  });
  
 export const purchase = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
  
    const cart = await Cart.findOne({ userId: sessionUser.id, status: 'active' })
    .populate(
      {
        path: 'productsInCart',
       
        populate: { path: 'productId' },
      },
      
      );
   
      
    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }
  
    let  totalPrice = 0;
  
    const productsPurchasedPromises = cart.productsInCart.map(
      async productInCart => {

        const newQty = productInCart.productId.quantity - productInCart.quantity;
        const productPrice =
          productInCart.quantity * +productInCart.productId.price;
  
        totalPrice += productPrice;
  
        await productInCart.productId.update({ quantity: newQty });
  
        return await productInCart.update({ status: 'purchased' });
      }
    );
  
    await Promise.all(productsPurchasedPromises);

    await new Email(sessionUser.email).sendPurchase(cart.productsInCart, totalPrice);

    res.status(200).json({ status: 'success' });
  });
  
 export const deleteProductFromCart = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const { id } = req.params;
  
    const cart = await Cart.findOne({ userId: sessionUser.id, status: 'active' });
  
    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }
  
    const productInCart = await ProductInCart.findOne({
      cartId: cart.id,      
      status: 'active',
    });
  
    if (!productInCart) {
      return next(new AppError('Product not found in cart', 404));
    }
  
    await productInCart.update({ status: 'deleted', quantity: 0 });
  
    res.status(200).json({ status: 'success' });
  });