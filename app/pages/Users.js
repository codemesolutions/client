import React, {Component} from 'react';
import {
    Table,
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    CustomInput,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormText,
    Pagination,
    PaginationItem,
    PaginationLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Spinner,
    UncontrolledAlert,
    Alert
} from 'reactstrap';

import {
    BrowserRouter as Router,
    Link,
    useLocation,
    withRouter,
  } from "react-router-dom";

import Validation from "../library/Validation";
import Header from "../components/page/Header";
import PageTitle from "../components/page/PageTitle";
import Paginate from "../components/global/Paginate";
import LoadingAnimation from "../components/global/LoadingAnimation";
import Search from "../components/global/Search";

import User from "../objects/User";
import PermissionModel from "../objects/PermissionModel";
import DataTable from "../components/global/DataTable";
import Page from "../components/page/Page";
import UserEditModal from '../components/user/UserEditModal';
import UserCreateModal from '../components/user/UserCreateModal';

var model = new User();
var permissionModel = new PermissionModel();
var validaton = new Validation();

class Users extends Component{

    constructor(props){
        super(props);

        this.state = {
            showEditBtn:false,
            showDeleteBtn:false,
            showDeleteSelectedBtn:false,
            editModalOpen:false,
            createModalOpen:false,
            deleteModalOpen:false,
            deleteSelectedModalOpen:false,
            loading:true,
            sortBy:null,
            sortDirection:null,
            items:[],
            columns:[
                {name:"Name", systemName:"username"},
                {name:"Email", systemName:"email"},
                {name:"Role", systemName:'name'}
            ],
            selectedRows:[],
            excludedRows:[],
            item:{},
            selectAllRows:false,
            total:0,
            lastPage:1,
            currentPage:1,
            perPage:5,
            perPageValues:[5,10, 25, 50, 75, 100, "all"],
            successMessage:null, 
        };

        //modal toggles
      
        //input change value
        this.onSort = this.onSort.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.showPerPage = this.showPerPage.bind(this);

        this.selectAll = this.selectAll.bind(this);
        this.onSelectRow = this.onSelectRow.bind(this);

        this.save = this.save.bind(this);
        this.update = this.update.bind(this);

        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    componentDidMount(){
        this.load();
        
    }

    componentDidUpdate(){
        var s = new URLSearchParams(window.location.search);
        var page = s.get('page') == null ? 1: s.get('page');
        if(this.state.currentPage === parseInt(page)){
            return;
        }

        else{
            this.load();
        }
    }

    load(){
        
        if(this.state.loading === false){
            this.setState({loading:true});
        }
       

        var s = new URLSearchParams(window.location.search);
        var page = s.get('page') == null ? 1: s.get('page');
        

        model.getPage(
            page, 
            this.state.perPage, 
            this.state.sortBy, 
            this.state.sortDirection === null ? "desc":this.state.sortDirection
        ).then((data) => {
            var selectedRows = this.state.selectedRows;
          
            if(this.state.selectAllRows){
                data.data.map((item) => {
                    selectedRows.push(item.id);
                });
            }

            this.setState({
                loading:false,
                sortBy: this.state.sortBy,
                sortDirection: this.state.sortDirection,
                total:data.total,
                items:data.data,
                lastPage:data.last_page,
                currentPage:data.current_page,
                selectAllRows:this.state.selectAllRows,
                selectedRows:selectedRows,
            });
        });
    }

    loadPermissions(){
        permissionModel.getAll().then((data) => {
            this.setState({
                permissions:data
            });
        });
    }

    onSort(column){
        var nextDirection = null;
        if(column === this.state.sortBy){
            if(this.state.sortDirection === null){
                nextDirection = 'asc';
            }
    
            else if(this.state.sortDirection === 'asc'){
                nextDirection = 'desc';
            }
    
            else if(this.state.sortDirection === 'desc'){
                nextDirection = null;
                column = "users.created_at"
            }
        }

        else{
            
            nextDirection = 'asc';
        }
        
       this.setState({
           sortBy:column,
           sortDirection:nextDirection
       }, this.load);

      
    }

    showPerPage(e){
        
        this.setState({
            perPage: parseInt(e.target.value),
            loading:true,

        }, function () {
            this.load();
        });
    }


    selectAll(e){
        if(e.target.checked){
            var selectedRows = [];

            this.state.items.map(item => {
                selectedRows.push(item.id);
            });

            this.setState({
                selectedRows:selectedRows,
                selectAllRows:true,
                showDeleteSelectedBtn:true,
            });
        }

        else{
            this.setState({
                selectedRows:[],
                selectAllRows:false,
                showDeleteSelectedBtn:false,
            });
        }
    }

    onSelectRow(e){
        var selectedRows = this.state.selectedRows;
        var val = parseInt(e.target.getAttribute('item'));
       
        if(e.target.checked){
            selectedRows.push(val);
            this.setState({
                selectedRows : selectedRows,
                showDeleteBtn: selectedRows.length === 1 ? true:false,
                showEditBtn: selectedRows.length === 1 ? true:false,
                showDeleteSelectedBtn: selectedRows.length > 1 ? true:false,
            });
        }

        else{
            var items = [];
            var excludedRows = this.state.excludedRows;
            
            if(selectedRows.includes(val)){

                this.state.selectedRows.map((v) => {
                   
                    if(v !== val){
                        items.push(v);
                    }

                    else if(this.state.selectAllRows){
                        excludedRows.push(v);
                    }
                });
                
                this.setState({
                    selectedRows:items,
                    excludedRows:excludedRows,
                    showDeleteBtn: items.length === 1 ? true:false,
                    showEditBtn: items.length === 1 ? true:false,
                    showDeleteSelectedBtn: items.length > 1 ? true:false,
                });

            }

        }
    }


    onSearchSubmit(term){
        if(term !== null){
            model.search(term).then((data) => {
                this.setState({
                    items:data,
                });
            });
        }

        else{
            this.load();
        }
       
    }


    toggleCreateModal(){
        this.setState({
            createModalOpen: this.state.createModalOpen ? false:true
        });
    }

    toggleEditModal(){
        model.getById(this.state.selectedRows[0]).then(data => {
            this.setState({
                item:data,
                editModalOpen: this.state.editModalOpen ? false:true
            });
        });
        
    }

    save(user){
        model.save(user).then(response => {
            if(response.id){
                this.setState({
                    successMessage:"Successfully created user",
                    createModalOpen:false
                });

                this.load();
            }
        });
    }

    update(user){
        user.id = this.state.selectedRows[0];
        model.update(user).then(response => {
            if(response.id){
                this.setState({
                    successMessage:"Successfully updated user",
                    editModalOpen:false,
                    selectedRows:[]
                });

                this.load();
            }
        });
    }

    render(){
        
        return (
            <Page>
                <Container className="my-4 bg-light-gradient shadow-sharpe p-3 p-lg-5">
                    {this.state.successMessage !== null ? 
                        <UncontrolledAlert color="success">{this.state.successMessage}</UncontrolledAlert>
                    :null}
                    <Row className="m-0 align-items-center p-0 mb-4">
                        <Link className="btn btn-primary btn-sm mr-3" to="/settings"><i className="fa fas fa-angle-left mr-1"></i> Back</Link>
                        <PageTitle icon="users" path = "/User" title="Users" description="Create, Edit, Update, Delete Users"/>
                        <div className="col p-0 ml-md-auto text-right mt-md-0">
                            {this.state.total > 0 ?
                                <Button color="primary" size="sm" onClick={this.toggleCreateModal}><i className="fa fas fa-plus mr-1"></i> Create</Button>
                            :null}
                        </div>
                    </Row>
                    {this.state.selectedRows.length  > 0 ? 
                        <Alert className="d-flex align-items-center" color="success">
                            You selected {this.state.selectAllRows === false ? this.state.selectedRows.length > 1 ? this.state.selectedRows.length + " rows": this.state.selectedRows.length + " row":"all rows"} 
                            {this.state.selectedRows.length  === 1 ? 
                                <div className="ml-auto">
                                    <Button 
                                        className={this.state.showEditBtn ? "":"d-none"} 
                                        color="primary" 
                                        size="sm" 
                                        onClick={this.toggleEditModal}>
                                        <i className="fa fas fa-pen mr-1"></i>
                                        Edit
                                    </Button>
                                    <Button 
                                        className={this.state.showDeleteBtn ? "":"d-none"} 
                                        color="primary" 
                                        size="sm" 
                                        onClick={this.toggleDeleteModal}>
                                        <i className="fa fas fa-trash mr-1"></i>
                                        Delete
                                    </Button>
                                </div>
                            : 
                                <Button 
                                    className={this.state.showDeleteSelectedBtn ? "ml-auto":"d-none"} 
                                    color="primary" 
                                    size="sm" 
                                    onClick={this.toggleDeleteSelectedModal}>
                                    <i className="fa fas fa-trash mr-1"></i>
                                    Delete
                                </Button>
                            }
                        </Alert>
                    :null}
                    <div className="">
                        <DataTable 
                            loading={this.state.loading}
                            selectedRows={this.state.selectedRows} 
                            selectAll={this.state.selectAllRows}
                            onSelectRow = {this.onSelectRow}
                            onSelectAll={this.selectAll} 
                            onSearch = {this.onSearchSubmit}
                            columns = {this.state.columns} 
                            rows={this.state.items}
                            perPage={this.state.perPage}
                            perPageValues = {this.state.perPageValues}
                            onPerPageChange={this.showPerPage}
                            total={this.state.total}
                            currentPage={this.state.currentPage}
                            lastPage={this.state.lastPage}
                            onSort={this.onSort}
                            sortBy={this.state.sortBy}
                            sortDirection={this.state.sortDirection}
                            page="/users"
                            />
                    </div>
                </Container>
                <UserCreateModal 
                    isOpen={this.state.createModalOpen}
                    toggle={this.toggleCreateModal}
                    onSubmit={this.save}
                />
               
                 <UserEditModal 
                    permission={this.state.item.permission_id}
                    username={this.state.item.username}
                    email={this.state.item.email}
                    isOpen={this.state.editModalOpen}
                    toggle={this.toggleEditModal}
                    onSubmit={this.update}
                />
            </Page>
            

        );
    }

}

export default Users;
