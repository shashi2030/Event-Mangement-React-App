import React from 'react';
import { Alert } from 'reactstrap';

export const AlertBox = (props) =>{
    return(
        <Alert color="success" isOpen={props.isOpen} toggle={props.onDismiss} fade={false}>
        <button type="button" className="close" onClick={props.closeAlert} aria-label="Close"><span aria-hidden="true">×</span></button>
            {props.message}
        </Alert>
    )
}