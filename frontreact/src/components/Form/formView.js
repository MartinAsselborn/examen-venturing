import React from "react";
import { useState,useEffect } from 'react';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";

const FormViewComponent=(props)=>{ 
    
    const [idmovie,setIdMovie]=useState("");
    const [titlemovie,settitleMovie]=useState("");
    const [descrimovie,setDescriMovie]=useState("");
    const [yearmovie,setYearMovie]=useState("");

        useEffect(() => {
            const getMovie=()=>{
                let token=JSON.parse(window.localStorage.getItem('JWT')).token;        
                let url=process.env.REACT_APP_URL_GET_MOVIES+((props.title)?props.title:"");
                
                Axios({
                    method: 'get', 
                    url: url,
                    data: {},
                    headers: {
                        'Access-Control-Allow-Origin' : '*',
                        'Content-Type': 'multipart/form-data',
                        'Authorization' : 'Bearer '+token  
                }})
                .then((res)=>{
                    setIdMovie(res.data.data[0].id);
                    settitleMovie(res.data.data[0].title);
                    setDescriMovie(res.data.data[0].descri);
                    setYearMovie(res.data.data[0].year);
                })
                .catch(err=>console.log(err));

            } 
             getMovie();
        },[]);  

  
    
    return (
        <form >
         <div className="form-group">
              <label>ID</label>
              <input type="text" className="form-control" id="id_movie"  defaultValue={idmovie} disabled/>
             </div>
            <div className="form-group">
              <label>TITLE</label>
              <input type="text" className="form-control" id="title_movie" defaultValue={titlemovie} disabled/>
             </div>
            <div className="form-group">
              <label>DESCRIPTION</label>
              <textarea className="form-control" id="descri_movie" rows="3" defaultValue={descrimovie} disabled></textarea>
             </div>
            <div className="form-group">
              <label>YEAR</label>
              <input type="text" className="form-control" id="year_movie" defaultValue={yearmovie} disabled/>
             </div>
            
        </form>
    );
}

export default FormViewComponent