import React from 'react';
import { Button, message, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const API_URL = `${process.env.REACT_APP_API_URL}api/v1/users/login`;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handlerSubmit = value => {
        
            dispatch({
                type: "SHOW_LOADING"
            });
            axios.post(`${API_URL}`, value)
            .then(res => {
            localStorage.setItem("auth", res)
            console.log(res);
            navigate("/");
            message.success("User login successfully!")
        
            dispatch({
                type: "HIDE_LOADING"
            })
            
            console.log(res);
        })
        .catch (error => {
            
                message.error("Wron login, please try again!")
           
        });
        
    }

    useEffect(() =>{
        localStorage.getItem("auth");
       //navigate("/")
    }, [])
   

    return (
        <div className='form-container-login'>
                
            <img src="/images/logo/logo.png" alt="logo" />
        <Form className='form-login' layout='vertical' onFinish={handlerSubmit}>
            <h2>Login</h2>
               
               <Form.Item className='form-item-login' name="email" label="Email ">
               <Input type = "email"/>
               </Form.Item>
               <Form.Item className='form-item-login' name="password" label="Password ">
                   <Input type = "password"/>
               </Form.Item>
               <div className="form-btn-add-login">
                   <Button htmlType='submit' className='add-button'>Login</Button>
                   <p>if you don't have an account...</p>
                   <Link className="link-register" to="/register">Register Here!</Link>
               </div>
               
           </Form>         
           
        </div>
    );
};

export default Login;