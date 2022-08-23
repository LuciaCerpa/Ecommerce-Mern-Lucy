import React from 'react';
import { Card, Button } from 'antd';
import { useDispatch } from 'react-redux'


const Product = ({product}) => {

const dispatch = useDispatch();


  const handleToCart = () =>{
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1}
    })
  }

    const { Meta } = Card;


    return (
        <Card
        hoverable
        style={{ width: 220, margin: 10}}
    cover={<img alt={product.name} src={product.image} style={{height: 200}}/>}
    
  >
    <Meta title={product.name} description={`$ ${product.price}`} />
    <div className="product-btn">
        <Button onClick={()=>handleToCart()}>Add to Cart</Button>
    </div>
  </Card>
    );
};

export default Product