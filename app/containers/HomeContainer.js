import React, { Component } from 'react';
import Home from '../components//Home/Home.js';
import {connect} from 'react-redux';


const sidebarStyles = {
    root:{
    }
};

class HomeContainer extends Component {

    constructor(props) {
		super(props);

    }
    componentWillMount() {
    
    }



    render () {
        return (
            <div>
                <Home/>
            </div>
        );
    };
};

export default HomeContainer;