import React from "react";
import { useForm } from "react-hook-form";
import '../app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import ButtonActionsComponent from "../Button/buttonAction";

const FormCreateComponent=(props)=>{ 
  
    const {register,handleSubmit}=useForm();
    const token=JSON.parse(window.localStorage.getItem('JWT')).token;   

        const onSubmit=(data)=>{
            let url=process.env.REACT_APP_URL_CREATE_MOVIE
            
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
                let datares=res.data.data;
                const newMovies= [
                    ...props.movies,
                    {...datares,
                        buttons:<ButtonActionsComponent setMovies={props.setMovies} getMovies={props.getMovies} idMovie={datares.id} title={datares.title}/>
                    }
                ]
                 props.getMovies();
                props.closeModal();
            })
            .catch(err=>{alert("There was an error creating!");
                props.closeModal();
            });

        }   

    

  
    
    return (
        <form onSubmit={handleSubmit(onSubmit) }>
           
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

export default FormCreateComponent