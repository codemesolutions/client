import React, {Component} from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
   } from 'reactstrap';

import {
    BrowserRouter as Router,
    Link,
    useLocation,
    withRouter,
  } from "react-router-dom";


class Paginate extends React.Component{

    render(){
        return(
            <Pagination className="" aria-label="Page navigation example ">
                <PaginationItem disabled={this.props.currentPage == 1 ? true:false}>
                    <Link className="page-link " to={this.props.url + "?page=1"}><i className="fa fas fa-angle-left"></i><i className="fa fas fa-angle-left"></i></Link>
                </PaginationItem>
                <PaginationItem disabled={this.props.currentPage == 1 ? true:false}>
                    <Link className="page-link " to={this.props.url + "?page=" + (this.props.currentPage - 1)}><i className="fa fas fa-angle-left"></i></Link>
                </PaginationItem>
                <PaginationItem disabled={this.props.currentPage === this.props.lastPage ? true:false}>
                    <Link className="page-link " to={this.props.url + "?page="+ (this.props.currentPage + 1)}><i className="fa fas fa-angle-right"></i></Link>
                </PaginationItem>
                <PaginationItem disabled={this.props.currentPage === this.props.lastPage ? true:false}>
                    <Link className="page-link " to={this.props.url + "?page=" + (this.props.lastPage)}><i className="fa fas fa-angle-right"></i><i className="fa fas fa-angle-right"></i></Link>
                </PaginationItem>
            </Pagination>
        );
    }
}


export default Paginate;
