import React, { Component } from 'react';
import styles from './Home.scss';

import Sidebar from 'react-sidebar';


class Home extends Component {
  constructor(props) {
		super(props);

    this.state = {
        sidebarOpen:false
    }

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
  }

  onSetSidebarOpen(){
    this.setState({sidebarOpen:!this.state.sidebarOpen});
  }

  render() {
    var sidebarContent = (<div>Sidebar Content</div>);

    return (
        <Sidebar sidebar={sidebarContent}
                  open={this.state.sidebarOpen}
                  onSetOpen={this.onSetSidebarOpen}>
          <i className="ion-navicon-round openSidebar"
              onClick={this.onSetSidebarOpen.bind(this)}></i>
          <div className="container">
            <div id="child1">dsfdfdsfsdfsdfsdsdf</div>
            <div id="child2">ddyeezy</div>
            <div id="child3">dsfdfdsdeeznutsfsdfsdfsdsdf</div>
          </div>
        </Sidebar>
        
      )
  };
};

export default Home;
