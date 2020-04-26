import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import UserForm from "./UserForm";

export default
class UserEditModal extends React.Component{
    constructor(props){
        super(props);

        this.state={};
    }

    render(){
        return( 
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalBody className="bg-white p-5 shadow">
                    <div className=" row m-0 align-items-center  mb-4">
                        <h5 className="font-weight-bold mb-0 text-primary">Edit User</h5>
                        <Button color="secondary" className="ml-auto" size="sm" onClick={this.props.toggle}><i className="fa fas fa-times"></i></Button>
                    </div>
                    <UserForm 
                        btnLabel="Edit User"
                        permission={this.props.permission} 
                        username={this.props.username} 
                        email={this.props.email} 
                        onSubmit={this.props.onSubmit}
                        />                  
                </ModalBody>
            </Modal>
        );
    }
}