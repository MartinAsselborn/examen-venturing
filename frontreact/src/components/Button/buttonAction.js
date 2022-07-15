import React from "react";
//import { useState } from 'react';
import { faPen,faEye,faTrash } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalComponent from '../Modal/modal'
const ButtonActionsComponent=(props)=>{
    
     return(
      <div style={{display: "flex"}}>
        <ModalComponent className="btn btn-dark" icons={faEye}  title={props.title} action="view"/>
        <ModalComponent className="btn btn-primary" icons={faPen}   getMovies={props.getMovies} title={props.title} action="update"/>
        <ModalComponent className="btn btn-danger" icons={faTrash}   getMovies={props.getMovies} idMovie={props.idMovie} title={props.title} action="delete"/>
      </div>
      
    );
}


export default ButtonActionsComponent;