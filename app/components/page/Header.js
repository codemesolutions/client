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
import MenuDropdown from '../menu/MenuDropdown'

export default
class Header extends React.Component{

    render(){
        return(
            <div>
                <Navbar className=" shadow-sm  position-relavent " color="primary" light expand="xs">
                    <Container>
                        <MenuDropdown />
                        <NavbarBrand href="/" className="text-white font-weight-bold ml-3">
                            code<span className="">me</span>
                        </NavbarBrand>
                    </Container>

                </Navbar>
            </div>
        );
    }
}



