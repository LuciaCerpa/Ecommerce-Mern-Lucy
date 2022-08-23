import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, message, Modal, Form, Input, Select } from 'antd';
import LayoutApp from '../../components/Layout';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined, } from '@ant-design/icons'
import FormItem from 'antd/lib/form/FormItem';
import './products.css'

const API_URL = `${process.env.REACT_APP_API_URL}api/v1/products`;

const Products = () => {

    const dispatch = useDispatch();

    const [productData, setProductData] = useState([])
    const [popModal, setPopModal] = useState(false)
    const [editProduct, setEditProduct] = useState(false)
    const getAllproducts = async () => {
        try {
            dispatch({
                type: "SHOW_LOADING"
            })
            const {data} = await axios.get(`${API_URL}`)
            setProductData(data);
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
        getAllproducts();
    }, [])

    const handlerSubmit = async (value)=>{
        if(editProduct === null) {
        try {
            dispatch({
                type: "SHOW_LOADING"
            });
            await axios.patch(`${API_URL}`, {...value, productId:editProduct._id} );
            message.success("Product updated successfully!")
            getAllproducts();
            setPopModal(false)
            dispatch({
                type: "HIDE_LOADING"
            })
            
    
        } catch (error) {
            dispatch({
                type: "HIDE_LOADING"
            })
            message.error("Error!")
            console.log(error);
        }
    }else{
        try {
            dispatch({
                type: "SHOW_LOADING"
            });
            const res = await axios.post(`${API_URL}`, value)
            message.success("Product added successfully!")
            getAllproducts();
            setPopModal(false)
            dispatch({
                type: "HIDE_LOADING"
            })
            console.log(res);
    
        } catch (error) {
            dispatch({
                type: "HIDE_LOADING"
            })
            message.error("Error!")
            console.log(error);
        }
    }
    };

   
    
    const handlerDelete = async (record) => {
        try {
            dispatch({
                type: "SHOW_LOADING"
            });
            await axios.delete(`${API_URL}`, {productId:record._id})
            message.success("Product deleted successfully!")
            getAllproducts();
            setPopModal(false)
            dispatch({
                type: "HIDE_LOADING"
            })
            
    
        } catch (error) {
            
            dispatch({
                type: "HIDE_LOADING"
            })
            message.error("Error!")
            console.log(error);
        }
    }
    

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            record: (image, record) => <svg src={image} alt={record.name} height={60} width={50} />
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        
        {
            title: 'Action',
            dataIndex: '_id',
            render:(id, record) =>
            <div>
            <EditOutlined className='cart-edit' onClick={() => {setEditProduct(record); setPopModal(true)}}/>
            <DeleteOutlined className='cart-action' onClick={() => handlerDelete(record)}/>
            </div>  
        },
    ];
    

    return (
        <LayoutApp>
           <div className='products'>
            <h2>All Products</h2>
            <Button className='add-button' onClick={() => setPopModal(true)}>Add New</Button>
            <ul class="cards">
                {
                    productData.map(product=>(
                        <li class="cards__item">
                          <div class="card">
                            <div class="card__image card__image--fence"><img src={product.image} alt={product.name} /></div>
                            <div class="card__content">
                              <div class="card__title">{product.name}</div>
                              <p class="card__text">$ {product.price}</p>
                              <p class="card__text">{product.category}</p>
                              <div className="buttonContainer">
                              <button class="btn btn--block card__btn"><EditOutlined className='cart-edit' onClick={() => {setEditProduct(product); setPopModal(true)}}/></button>
                              <button class="btn btn--block card__btn"><DeleteOutlined className='cart-action' onClick={() => handlerDelete(product)}/></button>
                              </div>
                            </div>
                          </div>
                        </li>
                    ))
                }
            </ul>
            {
                popModal &&
            
          <Modal title={`${editProduct !== null ? "Edit Product": "Add New Product"}`} visible={popModal} onCancel={()=> {setEditProduct(null); setPopModal(false)}} footer={false}>
           <Form layout='vertical' initialValues={editProduct} onFinish={handlerSubmit}>
               <FormItem name="name" label="Name ">
                   <Input/>
               </FormItem>
               <Form.Item name="category" label="Category ">
               <Select>
                   <Select.Option value="phones">Phones</Select.Option>
                   <Select.Option value="tvs">TVs</Select.Option>
                   <Select.Option value="laptops">Laptops</Select.Option>
                   <Select.Option value="watches">Watches</Select.Option>
               </Select>
               </Form.Item>
               <FormItem name="price" label="Price ">
                   <Input/>
               </FormItem>
               <FormItem name="image" label="Image URL ">
                   <Input/>
               </FormItem>
               <div className="form-btn-add">
                   <Button htmlType='submit' className='add-button'>Add Product</Button>
               </div>
           </Form>
         </Modal>
}   
            </div>
            
        </LayoutApp>
    );
};

export default Products;