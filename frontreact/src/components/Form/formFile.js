import React from "react";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import '../app.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";

const FormFileComponent= ()=>{ 

    const [nameFile,setNameFile]=useState('Choose File');
    const [Movielist,setMovielist]=useState();
    const {register,handleSubmit}=useForm();
    const [result,setResult]=useState([]);
    const [disabledSubmit,setDisabledSubmit]=useState(true);
    
    
   

    const onSubmit=(data)=>{
            let noDuplicates = [...new Set(result.map(x => x.title))];
            if(noDuplicates.length!==result.length){
                alert("Hay titles repetidos dentro del archivo");
                setResult([]);
                setDisabledSubmit(true);
                return;
            }

            setDisabledSubmit(true); 
            const formdata=new FormData();
            formdata.append("file",Movielist);

            let url=process.env.REACT_APP_URL_UPLOAD_MOVIES;
            let token=JSON.parse(window.localStorage.getItem('JWT')).token;    
            Axios({
                method: 'post', 
                url: url,
                data: formdata,
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : 'Bearer '+token,  
            }})
            .then(res=>alert(res.data.message))
            .catch(err=>console.log(err));

    }   
  
    function changeName(e){
            let arrayNames=document.getElementById('inputGroupFile02').value.split('\\');
            let last=arrayNames[arrayNames.length-1];
            setNameFile(last);
    }
    
    function verificate(e){
        let file = e.target.files[0];
        let reader = new FileReader();
        console.log(file);
        if(file && (file.type==="text/csv" || file.type==="application/vnd.ms-excel") ){
            setMovielist(file);
            setDisabledSubmit(false);
            reader.onload = function(e) {
                let csv = reader.result;
                let lines = csv.split("\n");
                let res=[];
                let newLine;
                let movie={};

                lines.map((line)=>{
                    newLine=line.split(";");
                    if(newLine[0]){//valida que tenga title
                        movie={
                            title:newLine[0],
                            descri:newLine[1],
                            year:newLine[2]
                        };
                        res.push(movie);
                    }
                    return line; 
                });
                
                setResult(res);
            }
            reader.readAsText(file);    
        }else{
          alert("No se cargo un nuevo archivo o el formato es invalido" );  
          setDisabledSubmit(true);
        }
         
        
        
    }
       
   
    
    return (
        <form onSubmit={handleSubmit(onSubmit) }>
        <input type='hidden' name="nameFile" id="nameFile" value={nameFile}></input>
        <div className='redsun'><h1>MOVIES UPLOADER</h1></div>
        <div className="input-group mb-3">
        <div className="custom-file">
           
            <input type="file" className="custom-file-input"  accept=".csv"
            name="inputGroupFile02" ref={register} id="inputGroupFile02"
             onChange={(e)=>{changeName(e);verificate(e);}}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">{nameFile}</label>
        </div>
        </div>
            <button type="submit" id='submit_button' className="btn btn-primary" disabled={disabledSubmit}>UPLOAD</button>
        </form>    
    );
}

export default FormFileComponent