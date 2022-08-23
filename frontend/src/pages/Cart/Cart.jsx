import React from 'react';
import LayoutApp from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Table, Button, message, Modal, Form, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import './cart.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/v1/carts';

const Cart = () => {

    const [subTotal, setSubTotal] = useState(0);
    const [billPopUp, setBillPopUp] = useState(false);
    const dispatch = useDispatch();
    //const [productData, setProductData] = useState([])
    const navigate = useNavigate()

    const { cartItems } = useSelector(state => state.rootReducer);

    const handlerIncrement = (record)=>{
        dispatch({
            type: "UPDATE_CART",
            payload: {...record, quantity: record.quantity+1}
        })
    }

    const handlerDecrement = (record)=>{
        if(record.quantity !== 1){
        dispatch({
            type: "UPDATE_CART",
            payload: {...record, quantity: record.quantity-1}
        })
    }
    };

       const handlerDelete = (record) => {
        dispatch({
            type: "DELETE_FROM_CART",
            payload: record
        })
    }

    useEffect(()=>{

        let temp = 0;
        cartItems.forEach(product => (temp = temp + product.price * product.quantity))
        setSubTotal(temp)

    }, [cartItems])
   
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: '_id',
            render:(id, record) =>  
            <div className='plusMinusItem'>
                <MinusCircleOutlined onClick={() => handlerDecrement(record)}/>
                <strong className='cart-quantity'>{record.quantity}</strong>    
                <PlusCircleOutlined onClick={() => handlerIncrement(record)}/>
            </div>
        },
        {
            title: 'Action',
            dataIndex: '_id',
            render:(id, record) =>
            <DeleteOutlined className='cart-action' onClick={() => handlerDelete(record)}/>
              
        },
    ];
    const tax= Number(Number((subTotal / 100) * 10).toFixed(2))
    const handlerSubmit = async (value) => {
        try {
            const newObject = {
                ...value,
                cartItems,
                subTotal,
                tax: tax,
                totalAmount:Number(parseInt(subTotal) + parseInt(tax)).toFixed(2),
                userId: JSON.parse(localStorage.getItem("auth"))._id
            }
            await axios.post(`${API_URL}`, newObject)
            message.success("Puserchase Generated!")
          //  localStorage.removeItem(cartItems);
            navigate("/purchases")
        } catch (error) {
            
        }
    }

    return (
        <LayoutApp>
            <div className="cart">
            <div className='buttonCartDiv'>
            <h2>Cart</h2>
           
            </div>
            <Table dataSource={cartItems} columns={columns} />;
            <div className="subTotal">
                <h2>Sub Total: <span>$ {(subTotal).toFixed(2)}</span></h2>
                <Button className='add-button' onClick={()=>setBillPopUp(true)}>Create Invoice</Button>
            </div>

            <Modal title= "Create Invoice" visible={billPopUp} onCancel={()=> setBillPopUp(false)} footer={false}>
            <Form className='form-purchase' layout='vertical' onFinish={handlerSubmit}>
            <h2>Invoice</h2>
               <Form.Item className='form-item-purchase' name="customerName" label="Customer Name">
                   <Input type = "text"/>
               </Form.Item>
               <Form.Item className = 'form-item-purchase' name = "customerEmail" label = "Customer Email ">
                    <Input type = "email"/>
               </Form.Item>
               
               <div className="total">
                    <h5>SubTotal: ${subTotal.toFixed(2)}</h5>
                    <h5>Tax: ${((subTotal/100)*10).toFixed(2)}</h5>
                    <h3>Total: ${(((subTotal / 100) * 10)+ subTotal).toFixed(2)}</h3>
               </div>
               <div className = "form-btn-add-user">
                   <Button htmlType = 'submit' className = 'add-button'>Generate Invoice</Button>
                </div>
               
           </Form>         
            </Modal>
        </div> 
        </LayoutApp>
    );
};

export default Cart;