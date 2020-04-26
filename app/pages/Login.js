import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Form, 
    FormGroup,
    Label,
    Input,
    FormText,
    CustomInput
} from 'reactstrap';
import {Link} from 'react-router-dom';
import PageNav from "../components/page/Header";
import Validation from "../library/Validation";
import AuthModel from "../objects/AuthModel";

var validation = new Validation();

export default
class Login extends Component{

    constructor(props){
        super(props);

        if(this.props.isAuthed){
            this.props.history.push('/');
        }

        this.state = {
            submittable:false,
            emailValid:null,
            passwordValid:null,
            emailValue:"",
            passwordValue:"",
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRememberMeChange = this.onRememberMeChange.bind(this);
    }


 

    onSubmit(e){
        e.preventDefault();
        var am = new AuthModel();
        am.authorize({
            email:this.state.emailValue,
            password:this.state.passwordValue
        }).then(response => {
            if(response[0] !== false){
                console.log(response);
               this.props.setUser(response);
               this.props.history.push('/');
            }
        });
    }

    onEmailChange(e){
        if(validation.isEmail(e.target.value)){
            this.setState({
                emailValue:e.target.value,
                emailValid:true
            });
        }

        else{
            this.setState({
                emailValid:false,
                emailValue:e.target.value,
            });
        }
       
    }

    onPasswordChange(e){
        if(validation.isGreaterThan(e.target.value.length, 5)){
            this.setState({
                passwordValue:e.target.value,
                passwordValid:true
            });
        }

        else{
            this.setState({
                passwordValue:e.target.value,
                passwordValid:false
            });
        }
       
    }

    onRememberMeChange(e){

    }

    render(){
        var emailInputBorders = this.state.emailValid == null ? null:this.state.emailValid ? "is-valid":"is-invalid";
        var passwordInputBorders = this.state.passwordValid == null ? null:this.state.passwordValid ? "is-valid":"is-invalid";
        return(
            <div className="bg-img h-100">
                <PageNav match={this.props.match}/>
                <Container>
                    <Row className="m-0 justify-content-center mt-5">
                        <Col className="p-0" lg="4">
                            <Form className="bg-white p-5 shadow" onSubmit={this.onSubmit}>
                                <h5 className="mb-4 font-weight-bold">Login</h5>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input 
                                        className = {emailInputBorders}
                                        type="email" 
                                        name="email" 
                                        placeholder="Email"
                                        value={this.state.emailValue} 
                                        onChange={this.onEmailChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        className={passwordInputBorders}
                                        type="password" 
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.passwordValue} 
                                        onChange={this.onPasswordChange}/>
                                </FormGroup>
                                <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Remember me" />
                                <div className="mt-3 mb-1"><Link to="/">Forgot Password</Link></div>
                                <div className="mb-3"><Link to="/">Create Account</Link></div>
                              
                                <Button className="py-3" size="sm" color="primary" block>Login</Button>
                            </Form>
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        );
    }
}