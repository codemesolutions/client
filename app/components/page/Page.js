import React, {Component} from 'react';
import Header from "./Header";

export default
class Page extends React.Component{
    constructor(props){
        super(props);

        this.state={};
    }

    render(){
        return( 
            <div className="bg-img h-100">
                <Header match={this.props.match}/>
                <div style={{height: "calc(100% - 60px)", overflow:"auto"}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}