import React, {Component} from 'react';
import GrapesJS from 'grapesjs';
import webpage from 'grapesjs-preset-webpage';

export default 
class Editor extends React.Component{

    constructor(props){
        super(props);

        this.state = {};
    }

    componentDidMount(){
        const editor = GrapesJS.init({
            container: '#gjs',
            // Get the content for the canvas directly from the element
            // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
            fromElement: false,
            // Size of the editor
            height: (window.innerHeight - 60) + 'px',
            width: 'auto',
            // Disable the storage manager for the moment
            storageManager: false,
            plugins: ['gjs-preset-webpage'],
            // Avoid any default panel
            panels: { defaults: [] },
           
        });
    }

    render(){
        return(
        <div>
            <div id="gjs"></div>
            <div id="blocks"></div>
        </div>);
    }

}
