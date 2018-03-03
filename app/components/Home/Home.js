import React, { Component } from 'react';
import {connect} from 'react-redux';

import styles from './Home.scss';

import Sidebar from 'react-sidebar';
import axios from 'axios';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';

import queryString from 'query-string';
import qs from 'querystring';


//actions
import {storeAccessToken} from 'tokenActions';

@connect((store)=>{
  return{
    access_token: store.tokenReducer.access_token
  }
})
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

  componentDidMount(){
    console.log('yeety')
  }

  getParams(){
    let params = queryString.parse(window.location.hash)
    this.props.storeAccessToken(params['access_token'])
  }

  printAccessToken(){
    console.log(this.props.access_token);
  }

  getRefreshToken(){
    
    var res = axios.post('/token/refresh',qs.stringify({
      refresh_token: this.getParams()['refresh_token']
    }))
  }

  render() {

    return (
        <div> 
          {/* <button onClick={this.loginSpotify.bind(this)}>authenticate your shit mang</button> */}
          <a href='/login'>Authenticate User</a>

          <button onClick={this.getParams.bind(this)}>get url params</button>
          <button onClick={this.printAccessToken.bind(this)}>print access token</button>
          <button onClick={this.getRefreshToken.bind(this)}>get refresh token</button>
          {/* <a href='/refresh'>Get refresh token</a> */}
        </div>
      )
  };
};

export default connect(null, {storeAccessToken})(Home);
