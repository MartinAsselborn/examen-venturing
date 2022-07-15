import React from "react";
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormCreateComponent from '../Form/formCreate'
import FormUpdateComponent from '../Form/formUpdate'
import FormViewComponent from '../Form/formView'
import FormDeleteComponent from '../Form/formDelete'

const ModalComponent=(props)=>{
    const [show, setShow] = useState(props.show?props.show:false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <div>
        {!props.show?<button type="button" className={props.className} onClick={handleShow}>
          <FontAwesomeIcon icon={props.icons} />
        </button>:''}
     
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.action.toUpperCase()} MOVIE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {(props.action==="update")?<FormUpdateComponent closeModal={handleClose} getMovies={props.getMovies} action={props.action} title={props.title}/>:""}
              {(props.action==="create")?<FormCreateComponent movies={props.movies} getMovies={props.getMovies} setMovies={props.setMovies} closeModal={handleClose} action={props.action}/>:""}
              {(props.action==="view")?<FormViewComponent title={props.title}/>:""}
              {(props.action==="delete")?<FormDeleteComponent closeModal={handleClose} getMovies={props.getMovies} action={props.action} idMovie={props.idMovie} title={props.title}/>:""}
          </Modal.Body>
          <Modal.Footer>
     
          </Modal.Footer>
        </Modal>
      </div>
    );
}


export default ModalComponent;
