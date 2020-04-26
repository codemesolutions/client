import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem 
} from 'reactstrap';
import {
    Link,
} from "react-router-dom";
import EditorNav from "../components/EditorNav";
import Editor from "../components/Editor";
//import {Editor} from 'grapesjs-react';





export default

class TemplateBuilder extends React.Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="h-100">
                <EditorNav match = {this.props.match}/>
                <Editor />
            </div>
        );
    }
}