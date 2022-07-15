import React from "react";
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import '../app.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter  } from 'react-bootstrap-table2-filter';

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ButtonActionsComponent from "../Button/buttonAction";

import ModalComponent from '../Modal/modal';




const MovieTableComponent=()=>{
    const [movies, setMovies] = useState([]);
    const columns = [{
        dataField: 'id',
        text: 'Movie ID'
      }, {
        dataField: 'title',
        text: 'Title:',
        filter: textFilter({
          style:{
            margin: '0 5px'
          }
        })
      },{
        dataField: 'buttons',
        text: 'Actions'
      }];
    
      const getMovies=()=>{
     
       let url=process.env.REACT_APP_URL_GET_MOVIES;
       let token=JSON.parse(window.localStorage.getItem('JWT')).token;    
       
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
        let newData=res.data.data.map(function(movie){
            let newMovie={...movie};
            newMovie.buttons = <ButtonActionsComponent  setMovies={setMovies} getMovies={getMovies} idMovie={movie.id} title={movie.title}/>
            return newMovie;
        });   
        setMovies(newData)
       })
       .catch(err=>console.log(err));

      }     
 

    useEffect(() => {
          getMovies();
    },[]);    
    

  
  
    return(
            
           <div> 
              <div className='redsun'><h1>MOVIE LIST</h1></div>
              <div style={{textAlign: "right"}}><ModalComponent movies={movies} setMovies={setMovies} getMovies={getMovies} className="btn btn-success" icons={faPlus} action="create"/></div> 
              <div><BootstrapTable  keyField='id' data={ movies } columns={ columns } pagination={ paginationFactory() } filter={ filterFactory() }/></div> 
           </div> 
    );
}


export default MovieTableComponent;