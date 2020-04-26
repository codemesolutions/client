import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Input,
    Table,
    CustomInput
} from 'reactstrap';
import {Link} from 'react-router-dom';
import PageTitle from "../components/page/PageTitle";
import PageNav from "../components/page/Header";
import Search from "../components/global/Search";

export default
class Invoices extends Component{

    constructor(props){
        super(props);
        this.state = {
            items:[]
        };

        this.onSearch = this.onSearch.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
    }

    onSearch(term){
        alert("searched");
    }

    onSelectAll(e){

    }

    render(){
        return(
            <div className=" h-100">
                <PageNav match={this.props.match}/>
                <div style={{height:"calc(100% - 60px)", overflow:"auto"}}>
                    <Container className="py-4">
                        <Row className="m-0 mb-4">
                            <Link className="btn btn-primary btn-sm mr-3" to="/">Back</Link>
                            <PageTitle title="Invoices" />
                            <Link className="btn btn-primary btn-sm ml-auto" to="/">Create Invoice</Link>
                        </Row>

                        <Row className="m-0 mb-3">
                            <Search onSearch={this.onSearch}/>
                        </Row>
                       
                        <Table className="m-0" responsive hover>
                                    <thead>
                                        <tr>
                                            <th style={{width: '30px'}}>
                                                <CustomInput onChange={this.selectAll} className="ml-1 small text-primary" type="checkbox" id="exampleCustomCheckbox"  checked={this.state.selectedAll} />
                                            </th>
                                            <th>
                                                Invoice
                                            </th>
                                            <th>
                                                Customer
                                            </th>
                                            <th>
                                                Status
                                            </th>
                                            <th>
                                                Created Date
                                            </th>
                                          


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.items.length > 0 ? this.state.items.map(item => {
                                            return (
                                                <tr key={item.id}>
                                                    <td style={{width: '30px'}}>
                                                       
                                                    </td>
                                                    <td>
                                                        <Link className="text-muted" to={"user/" + item.id}>{item.username}</Link>
                                                    </td>
                                                    <td className="small">
                                                        {item.email}
                                                    </td>
                                                    <td className="small">
                                                        {item.permissions.name}
                                                    </td>

                                                </tr>
                                            );

                                        }):null}
                                    </tbody>
                                </Table>
                    </Container>
                </div>
            </div>
        );
    }
}