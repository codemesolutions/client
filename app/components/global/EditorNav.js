import  React,{  Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container,
  Button
} from 'reactstrap';
import {
    Link,
} from "react-router-dom";



class EditorNav extends React.Component{

    render(){
        return(
            <div>
                <Navbar className="border-bottom shadow-sm  position-relavent " color="light-gradient" light expand="xs">
                        <Link className="btn btn-sm btn-primary" to={"/site/" + this.props.match.params.id + "/components"}>Back</Link>
                        <NavbarBrand href="/" className="text-primary font-weight-bold ml-3">
                            code<span className="">me</span>
                        </NavbarBrand>
                    

                </Navbar>
            </div>
        );
    }
}


export default EditorNav;
