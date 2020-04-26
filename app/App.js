import  React,{  Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    withRouter
  } from "react-router-dom";

import Dashboard from "./pages/Dashboard";


import Settings from "./pages/Settings";

import Users from "./pages/Users";
import Login from "./pages/Login";
import AuthModel from "./objects/AuthModel";

class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            user:{},
            isAuthorized:false
        };

        this.setUser = this.setUser.bind(this);
        console.log(this.state);
    }

    componentDidMount(){
        if(this.state.user.token !== undefined){
            var am = new AuthModel();
            am.isAuthorized(this.state.user.token).then(authed => {
                this.setState({
                    isAuthorized:authed[0]
                });
            });
        }
      
    }

    setUser(user){
        console.log("settings user");
        console.log(user);
        this.setState({user:user});
    }

    render(){

        return(
            <div className="h-100">
               
                <Switch>
                    <Route  path="/login"  render={(props) => <Login {...props} isAuthed={this.state.isAuthorized} setUser={this.setUser} />}/>
                    <Route  path="/users"  render={(props) => <Users {...props} user={this.state.user} isAuthed={this.state.isAuthorized} />}/>
                  
                    <Route  path="/settings"  render={(props) => <Settings {...props} user={this.state.user} isAuthed={this.state.isAuthorized} />}/>
                    <Route  path="/apps"  render={(props) => <Apps {...props} user={this.state.user} isAuthed={this.state.isAuthorized} />}/>
                    <Route  path="/"  render={(props) => <Dashboard {...props} user={this.state.user} isAuthed={this.state.isAuthorized} />}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
