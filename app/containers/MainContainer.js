import React, { Component } from 'react';
import Home from '../components/Home';

class MainContainer extends Component {

  // Set initial state
  constructor(props) {
		super(props);

	}

  render () {
    return (
      <div>
        <div>
          <Home/>
        </div>
        blah
        {this.props.children}
      </div>
    );
  };
};

export default MainContainer;