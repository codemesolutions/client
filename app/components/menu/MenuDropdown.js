import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Menu from "../../objects/Menu";
import {Link} from "react-router-dom";

export default

class MenuDropdown extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            items:[]
        };



    }


    componentDidMount(){
        this.loadMenu();
    }

    loadMenu(){

        var menu = new Menu();
        menu.getByName("Dashboard Menu").then((data) => {
            this.setState({
                items:data.menu_items
            });
        });
    }


    render(){


        return (
            <UncontrolledDropdown className={this.props.className}>
                <DropdownToggle className="border-dark"  size="sm" color="primary" caret>
                    <i className="fa fas fa-bars"></i>
                </DropdownToggle>
                <DropdownMenu className="bg-white border-left border-top border-right shadow p-3" >
                    <div style={{width: "250px", borderRadius: "0.25rem"}}>
                        {this.state.items.map((item, i) => {
                            var className = "text-center py-3 fa fas " + item.icon;
                            var linkClass = "nav-link p-0 px-2 small d-flex align-items-center border-bottom text-muted text-uppercase";
                            var itemActive = item.path === window.location.pathname ? " active":"";
                            className += itemActive;
                            linkClass += itemActive;
                                return(

                                    <Link key={item.id} style={{letterSpacing: "0.5px"}}  className={linkClass} to={item.path}>
                                        <i style={{width: "40px", fontSize:"0.8rem"}} className={className}></i><span className="pl-2">{item.name}</span>
                                    </Link>
                                )
                        })}
                    </div>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

}
