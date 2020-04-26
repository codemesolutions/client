import React, {Component} from 'react';
import {Link} from "react-router-dom";

class PageTitle extends React.Component{

    constructor(props){
        super(props);

    }


    render(){
        return(
            <div className="mr-5 p-0">
                <Link className="" to={this.props.path}>
                    <h4 className="m-0 font-weight-bold text-primary">{this.props.title}</h4>
                    <p className="m-0 small text-muted">{this.props.description}</p>
                </Link>

            </div>
        );
    }
}


export default PageTitle;
