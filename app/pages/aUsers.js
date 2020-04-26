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
    Alert   } from 'reactstrap';

import {
    BrowserRouter as Router,
    Link,
    useLocation,
    withRouter,
  } from "react-router-dom";

import Validation from "../library/Validation";
import PageNav from "../components/page/Header";
import PageTitle from "../components/page/PageTitle";
import Paginate from "../components/global/Paginate";
import LoadingAnimation from "../components/global/LoadingAnimation";
import Search from "../components/global/Search";
import Panel from "../components/Panel";
import User from "../objects/User";
import PermissionModel from "../objects/PermissionModel";

var model = new User();
var permissionModel = new PermissionModel();
var validaton = new Validation();

class Users extends Component{

    constructor(props){
        super(props);

        this.state = {
            item:{
                permission:'',
                username:"",
                email:null,
                password:'',
                password_confirmation:'',
            },
            items:[],
            permissions:[],
            createModal:false,
            deleteAllModal:false,
            permissionValid:false,
            usernameValid:null,
            emailValid:null,
            passwordValid:null,
            passwordConfirmationValid:null,
            searchTerm: "",
            currentPage: 1,
            lastPage:1,
            perPage: 10,
            loading:true,
            loaded:false,
            total:0,
            bulkControls:false,
            itemControls:false,
            selectedAll:false,
            selected : [],
            excluded:[]
        };

        //modal toggles
        this.toggle = this.toggle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.toggleDeleteAll = this.toggleDeleteAll.bind(this);


        //data actions
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);

        //input change value
        this.permissions = this.permissions.bind(this);
        this.username = this.username.bind(this);
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.passwordConfirmation = this.passwordConfirmation.bind(this);

        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.showPerPage = this.showPerPage.bind(this);

        this.selectAll = this.selectAll.bind(this);
        this.rowCheckboxChange = this.rowCheckboxChange.bind(this);
    }

    componentDidMount(){
        this.load();
    }

    componentWillReceiveProps(){
        this.setState({
            loading:true
        });

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
        var s = new URLSearchParams(window.location.search);
        var page = s.get('page') == null ? 1: s.get('page');

        model.getPage(page, this.state.perPage).then((data) => {
            var selected = this.state.selected;
            if(this.state.selectedAll){
                data.data.map((item) => {
                    selected.push(item.id);
                });
            }

            this.setState({
                total:data.total,
                items:data.data,
                lastPage:data.last_page,
                currentPage:data.current_page,
                loading:false,
                loaded:true,
                selectedAll:this.state.selectedAll,
                selected:selected,
            });
        });

        this.loadPermissions();
    }


    loadPermissions(){
        permissionModel.getAll().then((data) => {

            this.setState({
                permissions:data
            });
        });
    }

    showPerPage(e){
        this.setState({
            perPage: parseInt(e.target.value),
            loading:true,

        }, function () {
            this.load();
        });
    }


    toggle(event){
        this.setState({
            item:{
                permission:this.state.permissions[0].id,
                username:"",
                email:null,
                password:'',
                password_confirmation:'',
            },
            createModal:this.state.createModal ? false:true,
            items:this.state.items,
            usernameValid:null,
            emailValid:null,
            passValid:null,
            passConfirmValid:null
        });

    }

    toggleEdit(e){
        var item = e.target.getAttribute('item');

        if(item !== null){
            model.getById(item).then((data) => {
                this.setState({
                    item:data,
                    usernameValid:true,
                    editModal:this.state.editModal ? false:true,
                });
            });
        }

        else if(this.state.selected.length === 1){
            model.getById(this.state.selected[0]).then((data) => {
                this.setState({
                    item:data,
                    usernameValid:true,
                    editModal:this.state.editModal ? false:true,
                });
            });
        }


    }

    toggleDelete(e){
        var item = e.target.getAttribute('item');

        if(item !== null){
            this.setState({
                item:item,
                deleteModal:this.state.deleteModal ? false:true,
            });
        }
        else if(this.state.selected.length === 1){
            this.setState({
                item:this.state.selected[0],
                deleteModal:this.state.deleteModal ? false:true,
            });
        }
    }


    toggleDeleteAll(e){
        this.setState({
            deleteAllModal:this.state.deleteAllModal ? false:true,
        });
    }

    selectAll(e){
        if(e.target.checked){
            var selected = [];

            this.state.items.map(item => {
               selected.push(item.id);
            });

            this.setState({
                bulkControls:true,
                itemControls:false,
                selected:selected,
                selectedAll:true,
            });
        }

        else{
            this.setState({
                bulkControls:false,
                itemControls:false,
                selectedAll:false,
                selected:[]
            });
        }
    }

    rowCheckboxChange(e){
        var selected = this.state.selected;
        var val = parseInt(e.target.getAttribute('item'));

        if(e.target.checked){
            selected.push(parseInt(val));

            if(selected.length == 1){
                this.setState({
                    selected : selected,
                    bulkControls:false,
                    itemControls:true,
                });
            }

            else{
                this.setState({
                    selected : selected,
                    bulkControls:true,
                    itemControls:false,
                });
            }

        }

        else{
            var items = [];
            var excluded = this.state.excluded;

            if(selected.includes(val)){

                this.state.selected.map((v) => {
                    if(v !== val){
                        items.push(v);
                    }

                    else if(this.state.selectedAll){
                        excluded.push(v);
                    }
                });

                this.setState({
                    selected:items,
                    itemControls: items.length == 1 ? true:false,
                    bulkControls: items.length > 1 ? true:false,
                    excluded:excluded
                });

            }

        }
    }

    save(){
        model.save(this.state.item).then((response) => {
            if(response.id !== undefined){
                this.load();
                this.setState({
                    createModal:false,
                    items:this.state.items
                });

            }
        });
    };

    update(){
        model.update(this.state.item).then((response) => {
            if(response.id !== undefined){
                this.load();
                var items = this.state.items;
                items.name = "";
                this.setState({
                    editModal:false,
                    items: items
                });

            }
        });
    };

    delete(){
        model.delete(this.state.item).then((response) => {
            if(response.status == "success"){
                this.load();
                var items = this.state.items;
                items.name = "";
                this.setState({
                    deleteModal:false,
                    items: items,
                    item:{name:""}
                });
            }
        });


    }

    deleteAll(){
        model.deleteAll(this.state.excluded).then((response) => {
            if(response.status == "success"){
                this.load();
                var items = this.state.items;
                items.name = "";
                this.setState({
                    deleteAllModal:false,
                    items: items,
                    item:{name:""},
                    excluded:[],
                    selected:[],
                    selectedAll:false,
                    bulkControls:false
                });

            }
        });
    }

    permissions(e){
        var item = this.state.item;
        item.permission = e.target.value;

        if(e.target.value.length > 3){
            this.setState({
                item:item,
                permissionValid:true
            });
        }

        else{
            this.setState({
                item:item,
                permissionValid:false

            });
        }
    }

    username(e){
        var item = this.state.item;
        item.username = e.target.value;
        console.log(validaton.isValidString(item.username));
        if(validaton.isGreaterThan(item.username.length, 3) && validaton.isValidString(item.username)){
            this.setState({
                item:item,
                usernameValid:true
            });
        }

        else{
            this.setState({
                item:item,
                usernameValid:false
            });
        }
    }

    email(e){
        var item = this.state.item;
        item.email = e.target.value;

        if(validaton.isGreaterThan(item.email.length, 3) &&
            validaton.isEmail(item.email)){

            this.setState({
                item:item,
                emailValid:true
            });
        }

        else{
            console.log('failed');
            this.setState({
                item:item,
                emailValid:false

            });
        }
    }

    password(e){
        var item = this.state.item;
        item.password = e.target.value;

        if(validaton.isGreaterThan(item.password.length, 6)){
            this.setState({
                item:item,
                passValid:true
            });
        }

        else{
            this.setState({
                item:item,
                passValid:false

            });
        }
    }

    passwordConfirmation(e){
        var item = this.state.item;
        item.password_confirmation = e.target.value;

        if(validaton.isGreaterThan(item.password_confirmation.length, 6) &&
            item.password_confirmation === item.password){
            this.setState({
                item:item,
                passConfirmValid:true
            });
        }

        else{
            this.setState({
                item:item,
                passConfirmValid:false
            });
        }
    }

    onSearchSubmit(e){
        e.preventDefault();
        this.setState({loading:true});
        if(e.target.search.value.length > 0){
            model.search(e.target.search.value).then((data) => {
                this.setState({
                    items:data,
                    loading:false
                });
            });
        }

        else{
            this.load();
        }
    }

    onSearchInputChange(e){
        if(e.target.value.length === 0){
            this.load();
        }
    }


    render(){

        var usernameValid = this.state.usernameValid === null ?  "" :this.state.usernameValid ? "is-valid":"is-invalid";
        var emailValid = this.state.emailValid === null ?  "" : this.state.emailValid ? "is-valid":"is-invalid";
        var passValid = this.state.passValid === null ? "": this.state.passValid  ? "is-valid":"is-invalid";
        var passConfirmValid =this.state.passConfirmValid === null ? "": this.state.passConfirmValid  ? "is-valid":"is-invalid";
        var submitable = false;
        //is submittable
        if(this.state.usernameValid &&
            this.state.emailValid &&
            this.state.passValid &&
            this.state.passConfirmValid){submitable = true}

        var bulkControlsClass = this.state.bulkControls ? "d-inline-block mr-1":"d-none";
        var itemControlsClass = this.state.itemControls ? "d-inline-block mr-1":"d-none";
        //console.log(this.state);
        return (
            <div className="bg-img h-100">
                <PageNav match={this.props.match}/>
                <div style={{height: "calc(100% - 60px)", overflow:"auto"}}>



                    <Container className="my-4 bg-light-gradient shadow-sharpe p-5">

                        <Row className="m-0 align-items-center p-0 mb-4">
                            <Link className="btn btn-primary btn-sm mr-3" to="/settings">Back</Link>
                            <PageTitle icon="users" path = "/User" title="Users" description="Create, Edit, Update, Delete Users"/>
                        
                            <div className="col-12 col-md-auto p-0 ml-md-auto mt-3 mt-md-0">

                                <Button className={itemControlsClass}  color="primary" size="sm" onClick={this.toggleEdit}>Edit User  <i className="fa fas fa-pen ml-1"></i></Button>
                                <Button className={itemControlsClass}  color="primary" size="sm" onClick={this.toggleDelete}>Delete User  <i className="fa fas fa-trash ml-1"></i></Button>
                                <Button className={bulkControlsClass}  color="primary" size="sm" onClick={this.toggleDeleteAll}>Delete Users  <i className="fa fas fa-trash ml-1"></i></Button>
                                {this.state.total > 0 ?
                                <Button color="primary" size="sm" onClick={this.toggle}>Create User  <i className="fa fas fa-plus ml-1"></i></Button>
                                :null}


                            </div>

                        </Row>
                        {console.log(this.state)}
                        {this.state.total !== 0 && this.state.loading === false && this.state.loaded === true ?
                        <div className="">

                            <Row className="m-0 mb-4">
                                {this.state.total > 0 ?
                                    <Search onSearch={this.onSearchSubmit}/>
                                :null}
                            </Row>



                            <div>
                                <div  className=" mb-4  rounded-lg shadow-sharpe">
                                    <Table className="m-0 rounded " responsive hover>
                                        <thead>
                                            <tr>
                                                <th style={{width: '30px'}}>
                                                    <CustomInput onChange={this.selectAll} className="ml-1 small text-primary" type="checkbox" id="exampleCustomCheckbox"  checked={this.state.selectedAll} />
                                                </th>
                                                <th>
                                                    Username
                                                </th>
                                                <th>
                                                    Email
                                                </th>
                                                <th>
                                                    Permission
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.items.length > 0 ? this.state.items.map(item => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td style={{width: '30px'}}>
                                                            <CustomInput item={item.id} checked={this.selectedAll === true || this.state.selected.includes(item.id)  ? true:false}  onChange={this.rowCheckboxChange} type="checkbox" id={'item-' + item.id} />
                                                        </td>
                                                        <td>
                                                            <Link className="small text-dark" to={"user/" + item.id}>{item.username}</Link>
                                                        </td>
                                                        <td className="small">
                                                            {item.email}
                                                        </td>
                                                        <td className="small">
                                                            {item.permissions.name}
                                                        </td>

                                                    </tr>
                                                );

                                            }):null}
                                        </tbody>
                                    </Table>
                                </div>


                                <Row className="m-0 mt-3 align-items-center justify-content-start">
                                    <p className="small text-muted m-0 mr-3 p-0  text-left  text-nowrap">Showing
                                        <CustomInput style={{width: "50px"}} onChange={this.showPerPage} bsSize="sm" className=" ml-1 mr-1" type="select" id="exampleCustomSelect" name="customSelect">
                                            <option selected = {this.state.perPage === 10 ? true:false}>10</option>
                                            <option selected = {this.state.perPage === 15 ? true:false}>15</option>
                                            <option selected = {this.state.perPage === 25 ? true:false}>25</option>
                                            <option selected = {this.state.perPage === 50 ? true:false}>50</option>
                                            <option selected = {this.state.perPage === 75 ? true:false}>75</option>
                                            <option selected = {this.state.perPage === 0 ? true:false}>All</option>
                                        </CustomInput> of <span className="text-primary"> {this.state.total}</span>
                                    </p>
                                    <p className="small text-muted m-0  p-0 ml-auto mr-3 mt-1 text-right  text-nowrap">Page <span className="text-primary">{this.state.currentPage}</span> of <span className="text-primary">{this.state.lastPage}</span></p>
                                    <Paginate url="/User" currentPage={this.state.currentPage} lastPage={this.state.lastPage}/>

                                </Row>
                            </div>

                        </div>
                        : this.state.total === 0 && !this.state.loading ?
                            <div className="p-3 border-dark text-center row m-0 align-items-center">
                                <h6 className="m-0 text-white">You currently have no records</h6>
                                <Button color="primary" size="sm" className="ml-auto" onClick={this.toggle}>Create User  <i className="fa fas fa-plus ml-1"></i></Button>
                            </div> : <LoadingAnimation />
                        }

                    </Container>

                    <Modal isOpen={this.state.createModal} toggle={this.toggle} className={this.props.className}>

                        <ModalBody className="bg-secondary p-5 shadow border-dark">
                            <div className=" row m-0 align-items-center  mb-3">
                                <div>
                                    <h5 className="font-weight-bold mb-2 text-white">Create User</h5>
                                    <div style={{width: "50px", height: "5px"}} className="bg-primary"></div>
                                </div>
                                <Button color="secondary" className="ml-auto" size="sm" onClick={this.toggle}><i className="fa fas fa-times"></i></Button>
                            </div>
                            <div class=" ">
                                <Form className="">
                                    <FormGroup>
                                        <Label className="m-0 text-muted"><span className="text-primary">*</span> Permission</Label>
                                        <CustomInput type="select" id="exampleCustomSelect" name="permission" onChange={this.permission}>
                                        {this.state.permissions.map((perm, i) => {
                                            return <option key={i} value={perm.id}>{perm.name}</option>
                                        })}
                                        </CustomInput>

                                        <FormText>The User name can be any name you desire to identify the User you are creating</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="m-0 text-muted"><span className="text-primary">*</span> User Name</Label>
                                        <Input className={usernameValid } autoComplete="off" type="text" name="username" value={this.state.item.username} placeholder="name" onChange={this.username}/>
                                        <FormText>Username must be longer than 3 characters and contain only alpha numeric characters</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="m-0 text-muted"><span className="text-primary">*</span> Email</Label>
                                        <Input className={emailValid } autoComplete="off" type="text" name="email" value={this.state.item.email} placeholder="name" onChange={this.email}/>
                                        <FormText>The User name can be any name you desire to identify the User you are creating</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="m-0 text-muted"><span className="text-primary">*</span> Password</Label>
                                        <Input className={passValid } autoComplete="off" type="password" name="password" value={this.state.item.password} placeholder="name" onChange={this.password}/>
                                        <FormText>The User name can be any name you desire to identify the User you are creating</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="m-0 text-muted"><span className="text-primary">*</span> Confirm Password</Label>
                                        <Input className={passConfirmValid } autoComplete="off" type="password" name="password_confirmation" value={this.state.item.password_confirmation} placeholder="name" onChange={this.passwordConfirmation}/>
                                        <FormText>The User name can be any name you desire to identify the User you are creating</FormText>
                                    </FormGroup>
                                </Form>
                                <Row className="m-0 mt-4">
                                    <Button size="sm" color="primary" className="py-2" block disabled={submitable ? false:true} onClick={this.save}>Save</Button>
                                </Row>
                            </div>
                        </ModalBody>

                    </Modal>

                    <Modal isOpen={this.state.editModal} toggle={this.toggleEdit}>

                        <ModalBody className="bg-secondary p-5 shadow border-dark border-top-thick">
                            <div className=" row m-0 align-items-center  mb-3">
                                <h5 className="font-weight-bold mb-0 text-white">Edit User</h5>
                                <Button color="secondary" className="ml-auto" size="sm" onClick={this.toggleEdit}><i className="fa fas fa-times"></i></Button>
                            </div>
                            <div class=" ">
                                <Form className="">
                                    <FormGroup>
                                        <Label className="m-0 text-muted">User Name</Label>
                                        <Input className={ usernameValid} autoComplete="off" type="text" name="name" value={this.state.item.name} placeholder="name" onChange={this.name}/>
                                        <FormText>The User name can be any name you desire to identify the User you are creating</FormText>
                                    </FormGroup>
                                </Form>
                                <Row className="m-0 mt-4">
                                    <Button size="sm" color="primary" className="py-2" block disabled={submitable} onClick={this.update}>Save</Button>
                                </Row>
                            </div>
                        </ModalBody>

                    </Modal>

                    <Modal isOpen={this.state.deleteModal} toggle={this.toggleDelete}>

                        <ModalBody className="bg-secondary p-5 shadow border-dark border-top-thick">
                            <div className=" row m-0 align-items-center  mb-3">
                                <h5 className="font-weight-bold mb-0 text-white">Delete User</h5>
                                <Button color="secondary" className="ml-auto" size="sm" onClick={this.toggleDelete}><i className="fa fas fa-times"></i></Button>
                            </div>
                            <div class=" ">
                                <Row className="align-items-center m-0 my-3 border-dark bg-dark p-4">

                                    <Col className="p-0">
                                        <h6 className="text-white font-weight-bold mb-2">Are you sure?</h6>
                                        <p className="small m-0 text-muted">If you click delete this record will be removed from the database and will be forever gone.</p>
                                    </Col>
                                </Row>
                                <Row className="m-0 mt-4">
                                    <Button size="sm" color="danger" className="py-2 "   onClick={this.toggleDelete}>No Cancel</Button>
                                    <Button size="sm" color="primary" className="py-2 ml-auto"   onClick={this.delete}>Yes Delete</Button>

                                </Row>
                            </div>
                        </ModalBody>

                    </Modal>

                    <Modal isOpen={this.state.deleteAllModal} toggle={this.toggleDeleteAll} className={this.props.className}>

                    <ModalBody className="bg-secondary p-5 shadow border-dark border-top-thick">
                            <div className=" row m-0 align-items-center  mb-3">
                                <h5 className="font-weight-bold mb-0 text-white">Delete Users</h5>
                                <Button color="secondary" className="ml-auto" size="sm" onClick={this.toggleDeleteAll}><i className="fa fas fa-times"></i></Button>
                            </div>
                            <div class=" ">
                                <Row className="align-items-center m-0 my-3 border-dark bg-dark p-4">

                                    <Col className="p-0">
                                        <h6 className="text-white font-weight-bold mb-2">Are you sure?</h6>
                                        <p className="small m-0 text-muted">If you click delete this record will be removed from the database and will be forever gone.</p>
                                    </Col>
                                </Row>
                                <Row className="m-0 mt-4">
                                    <Button size="sm" color="danger" className="py-2 "   onClick={this.toggleDeleteAll}>No Cancel</Button>
                                    <Button size="sm" color="primary" className="py-2 ml-auto"   onClick={this.deleteAll}>Yes Delete All</Button>

                                </Row>
                            </div>
                        </ModalBody>
                    </Modal>



                </div>
        </div>
        );
    }

}

export default Users;
