import React, { Component } from 'react';
import Home from '../components/Home';
import {connect} from 'react-redux';



class HomeContainer extends Component {

    constructor(props) {
		super(props);

    }
    componentWillMount() {
    
    }


    render () {
        return (
            <div>
                <div>
                    <Home/>
                </div>
                {this.props.children}
            </div>
        );
    };
};

export default HomeContainer;