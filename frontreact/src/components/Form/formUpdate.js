import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";

const FormUpdateComponent=(props)=>{ 
  
    const {register,handleSubmit,setValue}=useForm();
    const token=JSON.parse(window.localStorage.getItem('JWT')).token;   

        const onSubmit=(data)=>{
            let url=process.env.REACT_APP_URL_UPDATE_MOVIE+((data.id)?data.id:"");
            let method="put";
            Axios({
                method: method, 
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

        useEffect(() => {
            const getMovie=()=>{
                
                let url=process.env.REACT_APP_URL_GET_MOVIES+((props.title)?props.title:"");
                
                Axios({
                    method: 'get', 
                    url: url,
                    data: {},
                    headers: {
                        'Access-Control-Allow-Origin' : '*',
                        'Content-Type': 'multipart/form-data',
                        'Authorization' : 'Bearer '+token, 
                }})
                .then((res)=>{
                    setValue("id",res.data.data[0].id);
                    setValue("idmovie",res.data.data[0].id);
                    setValue("title",res.data.data[0].title);
                    setValue("descri",res.data.data[0].descri);
                    setValue("year",res.data.data[0].year);
                })
                .catch(err=>console.log(err));

            }  
            getMovie();
        
        },[]);  

  
    
    return (
        <form onSubmit={handleSubmit(onSubmit) }>
            <input type="hidden" name="id" ref={register} />
            { (props.action!=="create")
                ?<div className="form-group">
              <label>ID</label>
              <input type="text" className="form-control"  name="idmovie" id="idmovie"  ref={register}  disabled={true}/>
             </div>:""}
            <div className="form-group">
              <label>TITLE</label>
              <input type="text" className="form-control"  name="title" id="title" ref={register} required/>
             </div>
            <div className="form-group">
              <label>DESCRIPTION</label>
              <textarea className="form-control"  name="descri" id="descri" rows="3" ref={register} required></textarea>
             </div>
            <div className="form-group">
              <label>YEAR</label>
              <input type="number" max={(new Date).getFullYear()} className="form-control"  name="year"  id="year" ref={register} required/>
             </div>
            
        
            <button type="submit" className="btn btn-primary">{props.action.toUpperCase()}</button>
        </form>
    );
}

export default FormUpdateComponent