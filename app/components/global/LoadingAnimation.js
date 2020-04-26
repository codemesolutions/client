import  React,{  Component } from 'react';
import {
  Row,
  Spinner
} from 'reactstrap';



class LoadingAnimation extends React.Component{

    render(){
        return(
            <div className="text-center text-primary py-5">
                <h6>Loading Data...</h6>
                <Row className="align-items-center justify-content-center">
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="primary" />
                </Row>
            </div>

        );
    }
}


export default LoadingAnimation;
