import React from 'react';
import './login.css';
import { deleteCookie } from './CookieMethods'

export default class Logout extends React.Component {

  constructor(props){
    super(props)
  }

  handleLogout = () => {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    window.location.replace('/');
  }

  handleNo = () => {
    window.history.back();
  }

  render(){
    return(
      <div className="logoutContainer">
        <div>Do you want to logout ?</div>
        <div>
          <button onClick={this.handleLogout}>Yes</button>
          <button onClick={this.handleNo}>No</button>
        </div>
      </div>
    )
  }
}