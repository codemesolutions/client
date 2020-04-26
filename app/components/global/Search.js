import  React,{  Component } from 'react';
import {
    Form,
    Button,
    Input,
} from 'reactstrap';


export default
class Search extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            term:"",
            searchded:false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
    
        this.setState({
            searched:this.state.term.length > 0 ? true:false
        });

        if(this.props.onSearch !== undefined && this.state.term.length > 0){
            this.props.onSearch(this.state.term);
        }
    }

    onChange(e){
        if(e.target.value.length === 0){
            this.props.onSearch(null);
        }

        this.setState({term:e.target.value, searched:false});
    }

    clearSearch(){
        this.setState({term:"", searched:false});
        this.props.onSearch(null);
    }

    render(){
        return(
            <Form className="col row m-0 p-0" onSubmit={this.onSubmit}>
                <Input bsSize="sm" className="col mr-1 " type="search" name="search" onChange={this.onChange} value={this.state.term} placeholder="Search..." />
                {!this.state.searched ?
                    <Button size="sm" className="px-2" color="primary" type="submit"><i className="fa fas fa-search"></i></Button>
                :<Button  size="sm" onClick={this.clearSearch} className="px-2" color="primary" type="button"><i className="fa fas fa-times"></i></Button>}
            </Form>
        );
    }
}

