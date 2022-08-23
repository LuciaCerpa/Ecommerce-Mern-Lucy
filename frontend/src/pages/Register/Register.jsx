import React from 'react';
import { Button, message, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';


const API_URL = `http://localhost:5000/api/v1/users`;

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerSubmit = value => {
        
            dispatch({
                type: "SHOW_LOADING"
            });
            axios.post(`${API_URL}`, value)
            .then(res => { 
                localStorage.setItem("auth", res)
            message.success("User created successfully!");
            navigate("/login");
            })
            dispatch({
                type: "HIDE_LOADING"
            })
            
    
         .catch (error => {
            if (error.response.status === 404) {
                alert("Wrong Register, please try again!")
            }
        });
    }

   

    return (
        <div className='form-container'>
                
            <img src="/images/logo/logo.png" alt="logo" />
        <Form className='form' layout='vertical' onFinish={handlerSubmit}>
            <h2>Register</h2>
               <Form.Item className='form-item' name="name" label="Name ">
                   <Input type = "text"/>
               </Form.Item>
               <Form.Item className='form-item' name="email" label="Email ">
               <Input type = "email"/>
               </Form.Item>
               <Form.Item className='form-item' name="password" label="Password ">
                   <Input type = "password"/>
               </Form.Item>
               <div className="form-btn-add">
                   <Button htmlType='submit' className='add-button'>Register</Button>
                   <p>Do you have an account?</p>
                   <Link className="link-login" to="/login">Login Here!</Link>
               </div>
               
           </Form>         
           
        </div>
    );
};

export default Register;