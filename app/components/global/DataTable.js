import React, {Component} from 'react';
import {
    Table,
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    CustomInput,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormText,
    Pagination,
    PaginationItem,
    PaginationLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Spinner,
    Alert   } from 'reactstrap';

import {
    BrowserRouter as Router,
    Link,
    useLocation,
    withRouter,
  } from "react-router-dom";


import Paginate from "./Paginate";
import LoadingAnimation from "./LoadingAnimation";
import Search from "./Search";



const sortDirections = [
    'none',
    'asc',
    'desc'
];



export default
class DataTable extends Component{

    constructor(props){
        super(props);

        this.state = {
            loading:this.props.loading,
            nextDirection:'asc',
            columns:this.props.columns,
            selectAll: this.props.selectAll === undefined ? false:this.props.selectAll,
            selected: this.props.selectedRows === undefined ? []:this.props.selectedRows,
        };
    }

    componentDidUpdate() {
        if(this.props.columns !== this.state.columns){
            this.setState({
                columns:this.props.columns,
            });
        }

        if(this.props.selectAll !== this.state.selectAll){
            this.setState({
                selectAll:this.props.selectAll,
            });
        }
       
        if(this.props.selectedRows !== this.state.selected){
            this.setState({
                selected:this.props.selectedRows,
            });
        }

        if(this.props.loading !== this.state.loading){
            this.setState({
                loading:this.props.loading,
            });
        }
    }

    handleSortDirection(column){
        if(column === this.props.sortBy){
            if(this.props.sortDirection === null){
                return(<i className="fa fas fa-sort ml-2"></i>);
            }
    
            else if(this.props.sortDirection === 'asc'){
              
    
                return(<i className="fa fas fa-sort-up ml-2"></i>);
            }
    
            else if(this.props.sortDirection === 'desc'){
                return(<i className="fa fas fa-sort-down ml-2"></i>);
            }
        }

        else{
            return(<i className="fa fas fa-sort ml-2"></i>);
        }
       
    }
   

    render(){
        var sortByDirection = null;
      
        return (
            <div>
               
                    <div className="">
                
                        <Row className="m-0 mb-4">
                            <Search onSearch={this.props.onSearch}/>
                        </Row>
                        <div  className="  rounded-lg shadow-sharpe">
                            <Table className="m-0 rounded border-top border-bottom " responsive hover>
                                <thead>
                                    <tr>
                                        <th style={{width: '50px'}}>
                                            <CustomInput onChange={this.props.onSelectAll} className="ml-1 small text-primary" type="checkbox" id="exampleCustomCheckbox"  checked={this.state.selectedAll} />
                                        </th>
                                        {this.state.columns.map((col, k) => {
                                            return(
                                                <th className={col.systemName === this.props.sortBy ? "bg-highlight border-left border-right":""} key={k} style={{cursor:"pointer"}} onClick={(e) => {this.props.onSort(col.systemName)}}>
                                                    {col.name}
                                                
                                                    {this.handleSortDirection(col.systemName)}

                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                {!this.state.loading ?
                                    <tbody>
                                        {this.props.rows.map((row,k) => {
                                            return(
                                                <tr key={k} className={this.state.selected.includes(row.id) ? "bg-highlight ":""}>
                                                    <td style={{width: '30px'}}>
                                                        <CustomInput item={row.id} checked={ this.state.selected.includes(row.id)  ? true:false}  onChange={this.props.onSelectRow} type="checkbox" id={'item-' + row.id} />
                                                    </td>
                                                    {this.props.columns.map((col,i) => {
                                                        if(col.systemName === this.props.sortBy && this.props.sortDirection !== null){
                                                            return(<td key={i} className="small bg-highlight border-left border-right">{row[col.systemName]}</td>);
                                                        }

                                                        else{
                                                            return(<td key={i} className="small">{row[col.systemName]}</td>);
                                                        }
                                                    
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                :<tbody><tr><td colspan="100%"><LoadingAnimation /></td></tr></tbody>}
                            </Table>
                        
                            <Row className="bg-white m-0 align-items-center justify-content-start p-3">
                                {this.props.total > this.props.perPage ? 
                                    <p className="small text-muted m-0 mr-3 p-0  text-left  text-nowrap">Showing
                                        <CustomInput defaultValue={this.props.perPage} style={{width: "50px"}} onChange={this.props.onPerPageChange} bsSize="sm" className=" ml-1 mr-1" type="select" id="exampleCustomSelect" name="customSelect">
                                            {this.props.perPageValues.map((val, k) => {
                                                return(<option key={k} value={val}>{val}</option>)
                                            })}
                                        </CustomInput> of <span className="text-primary"> {this.props.total}</span>
                                    </p>
                                :<p className="small text-muted m-0 mr-3 p-0  text-left  text-nowrap">Showing {this.props.rows.length} of {this.props.rows.length}</p>}
                                {this.props.lastPage !== undefined && this.props.lastPage > 1 ? 
                                    <div className='ml-auto row m-0 align-items-center'>
                                        <p className="small text-muted m-0  p-0  mr-3 mt-1 text-right  text-nowrap">Page <span className="text-primary">{this.props.currentPage}</span> of <span className="text-primary">{this.props.lastPage}</span></p>
                                        <Paginate url={this.props.page} currentPage={this.props.currentPage} lastPage={this.props.lastPage}/>
                                    </div>
                                :null}
                            </Row>
                        </div>
                    </div>
                
            </div>
        );
    }

}
