import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Input
} from 'reactstrap';
import {Link} from 'react-router-dom';
import PageNav from "../components/page/Header";
import AppLink from "../components/global/AppLink";
import Search from "../components/global/Search";
import PageTitle from "../components/page/PageTitle";

export default
class Dashboard extends Component{

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
                    <Container className="my-4 bg-light-gradient shadow-sharpe p-5 rounded">
                        <Row className="m-0 align-items-center p-0 mb-4">
                            <PageTitle icon="tachometer" path = "/" title="Dashboard" description="Create, Edit, Update, Delete Users"/>
                        </Row>
                        <Row className="m-0 mb-4">
                           
                                <Search />
                            
                        </Row>
                        <Row className="m-0 align-items-center   mb-3">
                            <Col className=" mb-2 p-0" xs="12">
                                <h5 className="font-weight-bold text-primary m-0">General</h5>
                            </Col>
                            <Col className="p-0 " xs="12">
                                <Row className="m-0 align-items-center ">
                                    
                                    
                                   
                                   <AppLink icon="cog" label="Settings" url="/settings"/>
                                   <AppLink icon="user" label="Account" url="/"/>
                                
                                </Row>
                            </Col>
                            
                        </Row>
                        <Row className="m-0 align-items-center   mt-5">
                            <Col className=" mb-2 p-0" xs="12">
                                <h5 className="font-weight-bold text-primary m-0">Users, Customers, Vendors</h5>
                            </Col>
                            <Col className="p-0 " xs="12">
                                <Row className="m-0 align-items-center ">
                                    <AppLink icon="address-card" label="Customers" url="/customers"/>
                                    <AppLink icon="address-card" label="Vendors" url="/vendors"/>
                                    <AppLink icon="address-card" label="Employee's" url="/vendors"/>
                                    <AppLink icon="address-card" label="Partners" url="/vendors"/>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="m-0 align-items-center   mt-5">
                            <Col className=" mb-2 p-0" xs="12">
                                <h5 className="font-weight-bold text-primary m-0">Financial</h5>
                            </Col>
                            <Col className="p-0 " xs="12">
                                <Row className="m-0 align-items-center ">
                                    <AppLink icon="chart" label="Accounts" url="/invoices"/>
                                    <AppLink icon="file-invoice-dollar" label="Invoices" url="/invoices"/>
                                    <AppLink icon="money-check" label="Purchasing" url="/invoices"/>
                                    <AppLink icon="piggy-bank" label="Sales" url="/invoices"/>
                                    <AppLink icon="money-check-alt" label="Expenses" url="/invoices"/>
                                    <AppLink icon="chart" label="Forcasting" url="/invoices"/>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="m-0 align-items-center   mt-5">
                            <Col className=" mb-2 p-0" xs="12">
                                <h5 className="font-weight-bold text-primary m-0">Inventory & Warehouse</h5>
                            </Col>
                            <Col className="p-0 " xs="12">
                                <Row className="m-0 align-items-center ">
                                    <AppLink icon="boxes" label="Inventory" url="/invoices"/>
                                    <AppLink icon="file-invoice-dollar" label="Orders" url="/invoices"/>
                                    <AppLink icon="money-check" label="Fufillment" url="/invoices"/>
                                    <AppLink icon="piggy-bank" label="Sales" url="/invoices"/>
                                    <AppLink icon="money-check-alt" label="Expenses" url="/invoices"/>
                                    <AppLink icon="chart" label="Forcasting" url="/invoices"/>
                                </Row>
                            </Col>
                        </Row>
                       
                    </Container>
                </div>
            </div>
        );
    }
}