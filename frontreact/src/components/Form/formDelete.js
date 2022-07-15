import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";

const FormDeleteComponent=(props)=>{ 
  
    const {register,handleSubmit,setValue}=useForm();
    const token=JSON.parse(window.localStorage.getItem('JWT')).token;   
    useEffect(() => {
        setValue("id",props.idMovie);
    },[]);  

    const onSubmit=(data)=>{
        let url=process.env.REACT_APP_URL_DELETE_MOVIE;
           
      
        
        Axios({
            method: "post", 
            url: url,
            data: data,
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+token,  
        }})
        .then((res)=>{
            props.getMovies();
            props.closeModal();
        })
        .catch(err=>console.log(err));

    }   

       
    return (
        <form onSubmit={handleSubmit(onSubmit) }>
            <input type="hidden" name="id" ref={register} />
            <div className="alert alert-dark" role="alert">
                       Esta seguro de eliminar el title "{props.title}"?
            </div>
            <div className="modal-footer">
               <button type="submit" className="btn btn-primary">SI</button>
               <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>{props.closeModal()}}>NO</button>
            </div>
        </form>
    );
}

export default FormDeleteComponent