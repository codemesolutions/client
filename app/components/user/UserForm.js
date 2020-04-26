import  React,{  Component } from 'react';
import {
    Form,
    Button,
    Input,
    CustomInput,
    FormGroup,
    FormText,
    Label,
} from 'reactstrap';

import PermissionModel from "../../objects/PermissionModel";
import Validation from "../../library/Validation";

var validation = new Validation();
var permissionModel = new PermissionModel();

export default
class UserForm extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username:this.props.username !== undefined ? this.props.username:"",
            usernameValid:this.props.username !== undefined ? true:null,
            usernameError:null,
            email:this.props.email !== undefined ? this.props.email:"",
            emailValid:this.props.email !== undefined ? true:null,
            emailError:null,
            permission:this.props.permission !== undefined ? this.props.permission:"",
            permissionValid:this.props.permission !== undefined ? true:null,
            permissions:[]
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPermissionChange = this.onPermissionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.loadPermissions();
    }

    loadPermissions(){
        permissionModel.getAll().then((data) => {
            this.setState({
                permissions:data
            });
            
        });
    }

    onUsernameChange(e){
        if(validation.isGreaterThan(e.target.value.length, 3)){
            this.setState({username:e.target.value, usernameValid:true, usernameError:null});
        }else if(e.target.value.length === 0){
            this.setState({username:e.target.value, usernameValid:null});
        }else{
            this.setState({username:e.target.value, usernameValid:false, usernameError:"Input must be longer than characters"});
        }
    }

    onEmailChange(e){
        if(validation.isEmail(e.target.value)){
            this.setState({email:e.target.value, emailValid:true, emailError:null});
        }else if(e.target.value.length === 0){
            this.setState({email:e.target.value, emailValid:null});
        }else{
            this.setState({email:e.target.value, emailValid:false, emailError:"Invalid Email Address"});
        }
    }

    onSubmit(e){
        e.preventDefault();
        var user = {
            username:this.state.username,
            email:this.state.email,
            permission:parseInt(this.state.permission),
        }

        this.props.onSubmit(user);
    }

    onPermissionChange(e){
        if(e.target.value !== null && e.target.value !== undefined && e.target.value !== ""){
            this.setState({
                permission:e.target.value,
                permissionValid:true
            });
        }

        else{
            this.setState({
                permission:e.target.value,
                permissionValid:false
            });
        }
       
    }


    render(){
            var submitBtnDisabled = true;
            if(this.state.usernameValid && 
                this.state.emailValid){
                submitBtnDisabled= false;
            }

        console.log(this.state.permission);

        return(
            <Form className="w-100" onSubmit={this.onSubmit}>
                <div className="px-3 mb-4">
                    <FormGroup>
                        <Label><span className="text-danger">*</span> Role</Label>
                        <CustomInput 
                            type="select" 
                            className={this.state.permissionValid !== null ? this.state.permissionValid ? "is-valid":"is-invalid":""}
                            value={this.state.permission} 
                            id="exampleCustomSelect" 
                            name="permission" 
                            onChange={this.onPermissionChange}>
                            {this.state.permissions.map((perm, i) => {
                                return <option key={i} value={parseInt(perm.id)}>{perm.name}</option>
                            })}
                        </CustomInput>
                       
                        <FormText>The role sets what permissions a user has when accessing the system.</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label><span className="text-danger">*</span> Username</Label>
                        <Input value={this.state.username} className={this.state.usernameValid !== null ? this.state.usernameValid ? "is-valid":"is-invalid":""} type="text" onChange={this.onUsernameChange}/>
                        {this.state.usernameError !== null ?
                            <FormText color="danger">{this.state.usernameError}</FormText>
                        :<FormText>The username must be longer than 3 characters.</FormText>}
                        
                    </FormGroup>
                    <FormGroup>
                        <Label><span className="text-danger">*</span> Email</Label>
                        <Input value={this.state.email} className={this.state.emailValid !== null ? this.state.emailValid ? "is-valid":"is-invalid":null} type="text" onChange={this.onEmailChange}/>
                        {this.state.emailError !== null ?
                            <FormText color="danger">{this.state.emailError}</FormText>
                        :<FormText>Please enter a valid email address for the user.  This is how they will access the system.</FormText>}
                    </FormGroup>
                   
                </div>
                <Button disabled={submitBtnDisabled} className={'py-2'} size="sm" color="primary" block>Save</Button>
            </Form>
        );
    }
}

