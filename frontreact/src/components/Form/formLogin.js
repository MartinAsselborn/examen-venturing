import React from "react";
import { useForm } from "react-hook-form";
//import { useState } from 'react';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../app";

const FormLoginComponent=()=>{ 
    const {register,handleSubmit}=useForm();
    const history=useHistory();
    const auth= useAuth();
    const location=useLocation();

    const onSubmit=(data)=>{
      
        let url=process.env.REACT_APP_URL_LOGIN;
                
        Axios({
            method: 'post', 
            url: url,
            data: data,
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type': 'application/json',
                'user' : data.user,
                'pass' : data.pass, 
        }})
        .then((res)=>{
             window.localStorage.setItem('JWT', JSON.stringify(res.data));
             
            let { from } = location.state || { from: { pathname: "/" } };   
             auth.signin(() => {
                history.replace(from);
             });
        })
        .catch(err=>console.log(err));

    }   
  
    
    return (
        <form onSubmit={handleSubmit(onSubmit) }>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1"><b>EMAIL</b></label>
              <input type="email" className="form-control" name="user" ref={register} aria-describedby="emailHelp" placeholder="Enter email"/>
           </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1"><b>PASSWORD</b></label>
              <input type="password" className="form-control" name="pass" ref={register} placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Log In!</button>
        </form>
    );
}

export default FormLoginComponent