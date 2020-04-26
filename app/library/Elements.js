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
import ComponentDropdown from "../components/ComponentsDropdown";
import ElementStyleDropdown from "../components/ElementStyleDropdown";

export default class Elements{

    renderElement(el, k, ElementClick, refresh){
        
        if(el.tag == "div"){
            return(this.div(el, k, ElementClick, refresh));
        }

        if(el.tag == "section"){
            return(this.section(el, k, ElementClick, refresh));
        }

        return null;
    }
   

    div(el, k, elementClickHandler){
        return(
            <div key={k} className="element p-0 mb-1">
                <div className=" p-0  m-0">
                    <p className="bg-danger text-white small m-0 border px-2 float-left">{el.tag}</p> 
                    <ElementStyleDropdown refresh={() => refresh} element = {el}/> 
                    <ComponentDropdown id={el.id} onClick={elementClickHandler}/>
                </div>
            
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
                
            </div>
        );
    }

    section(el, k, elementClickHandler){
        return(
            <div key={k} className="element p-0 mb-1">
                <div className=" p-0  m-0">
                    <p className="bg-danger text-white small m-0 border px-2 float-left">{el.tag}</p> 
                    <ElementStyleDropdown refresh={() => this.test()} element = {el}/> 
                    <ComponentDropdown id={el.id} onClick={elementClickHandler}/>
                </div>
            
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
                
            </div>
        );
    }
  
}