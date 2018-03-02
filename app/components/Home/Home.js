import React, { Component } from 'react';
import styles from './Home.scss';

import Sidebar from 'react-sidebar';
import axios from 'axios';


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

  // loginSpotify(){
  //   axios.get('/login')
  //   .then((response)=>{
  //     console.log(response)
  //   })
  // }

  render() {

    return (
        <div> 
          {/* <button onClick={this.loginSpotify.bind(this)}>authenticate your shit mang</button> */}
          <a href='/login'>no way</a>
        </div>
      )
  };
};

export default Home;
