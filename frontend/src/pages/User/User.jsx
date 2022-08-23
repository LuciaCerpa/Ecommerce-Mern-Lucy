import React from 'react';
import LayoutApp from './../../components/Layout';
import { useEffect, useState, } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import './user.css'

const API_URL = `http://localhost:5000/api/v1/users`;


const User = () => {

  const dispatch = useDispatch();
  const [purchaseData, setPurchaseData] = useState([])

  const getAllusers = async () => {
        
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
    getAllusers();
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
  
];

    return (
        <LayoutApp>
            <div className='allUsers'>
          <h2>All Users</h2>  
          <Table dataSource={purchaseData} columns={columns} />;
          </div>
        </LayoutApp>
    );
};

export default User;