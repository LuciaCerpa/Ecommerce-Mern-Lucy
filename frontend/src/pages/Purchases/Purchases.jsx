import React from 'react';
import LayoutApp from './../../components/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button, Table, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { EyeOutlined} from '@ant-design/icons'
//import './purchases.css'
import {useReactToPrint} from 'react-to-print'

const API_URL = `${process.env.REACT_APP_API_URL}api/v1/purchases`;

const Purchases = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();

    const [purchaseData, setPurchaseData] = useState([])
    const [popModal, setPopModal] = useState(false)
    const [selectedPurchase, setSelectedPurchase] = useState(null)

    const getAllpurchases = async () => {
        
        try {
            dispatch({
                type: "SHOW_LOADING"
            })
            const {data} = await axios.get(`${API_URL}`)
            setPurchaseData(data);
            dispatch({
                type: "HIDE_LOADING"
            })
            console.log(data);

        } catch (error) {
            dispatch({
                type: "HIDE_LOADING"
            })
            console.log(error);
        }
    }

    useEffect(()=>{
        getAllpurchases();
    }, [])

     
    const columns = [
        {
            title: 'Id',
            dataIndex: 'user._id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            
        },
        {
            title: 'Sub Total',
            dataIndex: 'subTotal',
        },
        {
            title: 'Tax',
            dataIndex: 'tax',
            
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            
        },
         {
            title: 'Action',
            dataIndex: '_id',
            render:(id, record) =>
            <div>
            <EyeOutlined className='cart-edit' onClick={() => {setSelectedPurchase(record); setPopModal(true)}}/>
            </div>
        },
    ];

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })
    
    return (
        <LayoutApp>
            <div className='purchases'>
            <h2>All Purchases</h2>
            <Table dataSource={purchaseData} columns={columns} />;
            
            {
                popModal &&
            
          <Modal title="Purchase Detail" width={400} pagination={false} onCancel={()=> setPopModal(false)} footer={false}>
            <div className="card" ref={componentRef}>
                <div className="cardHeader">
                <img src="/public/images/logo/logo-oscuro.png" alt="logo" />
                <h5>Phone number: +5233456861</h5>
                <h5>Adress: Av. chapultepec #530</h5>
                <h5>Guadalajara, Jalisco, México</h5>
                </div>
                <div className="cardBody">
                    <div className="userPurchase">
                        <h3>Date Order: --------{selectedPurchase.date.toString().substring(0 , 10)}</h3>
                        <h3>User: ------------- {selectedPurchase.name}</h3>
                        <h3>Email: ------------ {selectedPurchase.email}</h3>
                        {
                        <div className="productsPurchased">
                            <h2>Your Order</h2>
                            {
                                purchaseData.map(product=>(
                                    <div className="pruductPurchased">
                                        <h3>Product: ----- {product.name}</h3>
                                        <h3>Quantity: ------- {product.quantity}</h3>
                                        <h3>Price: ---------- {product.price}</h3>
                                    </div>
                                ))
                            }
                        </div>
                    }

                        <h3>Total Amount: ------{selectedPurchase.totalAmount}</h3>
                        
                    </div>
                    <h4>Thanks for your purchase!</h4>
                    
                </div>
            </div>
               <div className="form-btn-add">
                   <Button onClick={handlePrint} htmlType='submit' className='add-button'>Generate Purchase</Button>
               </div>
           
         </Modal>
}   
            </div>
        </LayoutApp>
    );
};

export default Purchases;