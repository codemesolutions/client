import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Input
} from 'reactstrap';
import {Link} from 'react-router-dom';
import PageTitle from "../components/page/PageTitle";
import PageNav from "../components/page/Header";
import AppLink from "../components/global/AppLink";

export default
class Settings extends Component{

    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        if(!this.props.isAuthed){
            console.log(this.props);
        }
    }

    render(){
        return(
            <div className="bg-img h-100">
                <PageNav match={this.props.match}/>
                <div style={{height:"calc(100% - 60px)", overflow:"auto"}}>
                    <Container className="my-4 bg-light-gradient shadow-sharpe p-5">
                        <Row className="m-0 mb-4">
                            <Link className="btn btn-primary btn-sm mr-3" to="/">Back</Link>
                            <PageTitle title="Settings" />
                           
                        </Row>
                        <Row className="m-0 align-items-center   mt-4">

                            <Col className="p-0 " xs="12">
                                <Row className="m-0 align-items-center ">
                                    
                                    
                                   
                                   <AppLink icon="users" label="Users" url="/users"/>
                                   <AppLink icon="lock-open" label="Roles" url="/permissions"/>
                                
                                </Row>
                            </Col>
                            
                        </Row>
                     
                        
                       
                    </Container>
                </div>
            </div>
        );
    }
}