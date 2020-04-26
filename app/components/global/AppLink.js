import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default
class AppLink extends Component{

    constructor(props){
        super(props);   
    }

    render(){
        return(
            <Link 
                style={{width: "130px", height:"130px"}} 
                className="d-flex flex-column text-center text-white rounded-lg bg-primary shadow-sharpe m-1 align-items-center justify-content-center" 
                to={this.props.url}
            >
                <i className={"fa fas fa-"+this.props.icon+"  mb-2"}></i>
                <p className="m-0 small">{this.props.label}</p>
            </Link>
        );
    }
}