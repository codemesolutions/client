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
import Site from "../objects/SiteModel";
import {
    Link,
} from "react-router-dom";
import Elements from "../library/Elements";
import PageTitle from "../components/PageTitle";
import PageNav from "../components/PageNav";
import ComponentModel from "../objects/ComponentModel";
import ElementModel from "../objects/ElementModel";
import ElementContainer from "../components/ElementContainer";
import ElementToolbar from "../components/ElementToolbar";
import ComponentDropdown from "../components/ComponentsDropdown";
import ElementStyleDropdown from "../components/ElementStyleDropdown";

var elements = new Elements();

class SiteComponent extends React.Component{
    constructor(props){
        super(props);

        this.state={
            component:{},
            called:0
        };

       
        this.ElementClick = this.ElementClick.bind(this);
        this.renderElement = this.renderElement.bind(this);
        this.load = this.load.bind(this);
        this.test = this.test.bind(this);
       
    }

    componentDidMount(){
       this.load();
    }

    load(){

       var state = this;
        var cm = new ComponentModel();
        console.log(this.props.match.params.component);
        cm.getById(this.props.match.params.component).then(data => {
            console.log(data);
           state.setState({
               component:data
           });
        });
    }

    load2(){

        var state = this;
         var cm = new ComponentModel();
         console.log(this.props.match.params.component);
         cm.getById(this.props.match.params.component).then(data => {
             console.log(data);
            state.setState({
                component:data
            });
         });
     }

    ElementClick(e){
         var cm = new ComponentModel();
         cm.saveElement({
            id: this.props.match.params.component,
            tag:e.target.getAttribute('element'),
            tag_id:null,
            tag_class:null,
            tag_style:JSON.stringify({}),
            tag_height:null,
            tag_width:null,
            parent:e.target.getAttribute('parent')
         }).then((response) => {
            if(response.id !== undefined){
               this.load();
            }
        });
    }

    test(){
        this.load2();
    }

    div(el, k){
        return(
            <ElementContainer key={k}>
                <ElementToolbar element = {el} refresh={() => this.test()} onClick={this.ElementClick}/>
            
                <div 
                    id={el.tag_id} 
                    className={el.tag_class} 
                    style={JSON.parse(el.tag_style)}
                    width={el.tag_width}
                    height={el.tag_height}>
                    {el.children.map(child => {
                        return this.renderElement(child, child.id);
                    })}
                </div>
                
            </ElementContainer>
        );
    }

    section(el, k){
        return(
            <ElementContainer key={k}>
                <ElementToolbar element = {el} refresh={() => this.test()} onClick={this.ElementClick}/>
            
                <section 
                    id={el.tag_id} 
                    className={el.tag_class} 
                    style={JSON.parse(el.tag_style)}
                    width={el.tag_width}
                    height={el.tag_height}>
                    {el.children.map(child => {
                        return this.renderElement(child, child.id);
                    })}
                </section>
                
            </ElementContainer>
        );
    }

    renderElement(el, k){
       
        if(el.tag == "div"){
            return(this.div(el, k));
        }

        if(el.tag == "section"){
            return(this.section(el, k));
        }

        return null;
    }
   
  
    render(){
      
        return(
            <div className="h-100">
                <PageNav match={this.props.match}/>
                <Row className="m-0" style={{height:"calc(100% - 60px)"}}>
                    <Container>
                        <div className="p-0 h-100">
                            <Row className="m-0 align-items-center bg-white border-left border-right p-3">
                                <h6 className="font-weight-bold m-0">Component</h6>
                                <UncontrolledDropdown className="ml-3">
                                    <DropdownToggle className="border"  size="sm" color="light" caret>
                                        <i className="fa fas fa-boxes mr-1"></i>
                                        Elements
                                    </DropdownToggle>
                                    <DropdownMenu className="bg-white border-left border-top border-right shadow p-3" >
                                        <div className="row m-0 p-3" style={{width: "550px", borderRadius: "0.25rem"}}>
                                            <div className="col-12 p-0 mb-2">
                                                <h6 className="font-weight-bold">Components</h6>
                                            </div>
                                            <Row className="m-0 justify-content-start">
                                                <Button onClick={this.ElementClick} size="sm" color="light" className="border rounded-0 m-1 py-2 px-3">
                                                    <i className="fa  fa-square  mr-1 "></i>
                                                    Div
                                                </Button>
                                                <Button size="sm" color="light" className="border rounded-0 m-1 py-2 px-3">
                                                    <i className="fa  fa-square  mr-1 "></i>
                                                    Row
                                                </Button>
                                                <Button size="sm" color="light" className="border rounded-0 m-1 py-2 px-3">
                                                    <i className="fa  fa-square  mr-1 "></i>
                                                    Text
                                                </Button>
                                                <Button size="sm" color="light" className="border rounded-0 m-1 py-2 px-3">
                                                    <i className="fa  fa-square  mr-1 "></i>
                                                    Button
                                                </Button>
                                                <Button size="sm" color="light" className="border rounded-0 m-1 py-2 px-3">
                                                    <i className="fa  fa-square  mr-1 "></i>
                                                    Header
                                                </Button>
                                                <Button size="sm" color="light" className="border rounded-0 m-1 py-2 px-3">
                                                    <i className="fa  fa-square  mr-1 "></i>
                                                    Link
                                                </Button>
                                                <Button size="sm" color="light" className="border rounded-0 m-1 py-2 px-3">
                                                    <i className="fa  fa-square  mr-1 "></i>
                                                    Image
                                                </Button>
                                                <Button size="sm" color="light" className="border rounded-0 m-1 py-2 px-3">
                                                    <i className="fa  fa-square  mr-1 "></i>
                                                    Video
                                                </Button>
                                                <Button size="sm" color="light" className="border rounded-0 m-1 py-2 px-3">
                                                    <i className="fa  fa-square  mr-1 "></i>
                                                    HTML
                                                </Button>
                                                <Button size="sm" color="light" className="border rounded-0 m-1 py-2 px-3">
                                                    <i className="fa  fa-square  mr-1 "></i>
                                                    Form
                                                </Button>
                                                
                                                
                                            </Row>
                                            
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                            </Row>
                            <div className="h-75 border bg-light p-3 overflow-auto">
                               {this.state.component.elements !== undefined ? this.state.component.elements.map((el, k) => {
                                   if(el.parent_id === null){
                                       return this.renderElement(el, k);
                                   }
                               }):null}
                            </div>
                        </div>
                    </Container>
                </Row>
              
            </div>
        );
    }
}

export default SiteComponent;
