import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { Icon, message } from 'antd';
import Axios from 'axios';
import { setCookie, getCookie, deleteCookie } from './CookieMethods';
import './login.css';
import { storeUserInfo } from './LoginActions';
import constants from '../../Constants/constants';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
      loading: false,
      errorMsg: '',
      initialLoading: 'true',
      forgotPwd: false,
    }
    this.scopes = ""
  }

  componentDidMount() {
    const access_token = getCookie('access_token');
    if (access_token) {
      this.setState({
        loading: true
      }, () => {
        Axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`).then(res => {
          if(res.data) {
            this.handlePostLogin({ profileObj: res.data, tokenObj: {access_token} });
          }
        }).catch(err => {
          message.error(err.response.data.error.status)
          deleteCookie('access_token');
          window.location.reload('true');
        })
      })
    } else {
      this.setState({
        initialLoading: false
      })
    }
  }

  setCookieWithRes = (res) => {
    for (let token in res) {
      setCookie(token, res[token], 7)
    }
  }

  getUrlEncodedParams = (paramObj) => {
    let paramString = ''
    for (let key in paramObj) {
      paramString = paramString ? `${paramString}&${encodeURI(key)}=${encodeURI(paramObj[key])}` : `${encodeURI(key)}=${encodeURI(paramObj[key])}`
    }
    return paramString;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      errorMsg: '',
    });
  }

  handlePostLogin = (res) => {
    Axios.get(`http://192.168.4.239:8080/api/v1/user/${encodeURIComponent(res.profileObj.email)}/`).then(res2 => {
      if(res2.data) {
        console.log(res2.data)
        this.props.storeUserInfo({...res.profileObj, userid: res2.data.id, loggedIn: true})
        this.setCookieWithRes(res.tokenObj);
      }
    }).catch( err => {
      message.error(err.response.data.message);
      deleteCookie('access_token');
      window.location.reload('true');
    }) 
  }

  handleGSuccess = (res) => {
    console.log(res);
    this.setState({
      loading: true,
      errorMsg: '',
    }, () => {
      this.handlePostLogin(res);
    });
  }

  handleGFailure = (res) => {
    console.log(res);
  }

  toggleForgotPwdMode = () => {
    this.setState({
      forgotPwd: !this.state.forgotPwd
    })
  }

  render() {
    return (
      this.state.initialLoading ? <div className='outerContainer'><Icon type="loading" style={{ fontSize: 60 }} /></div> :
        <div className='outerContainer'>
          <form className='loginContainer' onSubmit={this.handleLogin}>
            <div className='headingContainer'>
              <h1>Smart Life Insurance</h1>
            </div>
            <div className='inputContainer'>
              <label className='labelStyle'>Enter your email id</label>
              <input type='text' name="username" onChange={this.handleChange} value={this.state.username} className='inputStyle' />
            </div>
            <div className='inputContainer'>
              <label className='labelStyle'>Enter your password</label>
              <input type='password' name="password" onChange={this.handleChange} value={this.state.password} className='inputStyle' />
            </div>
            <div className='inputContainer'>
              <input type='submit' className='loginButton' style={{ opacity: this.state.loading ? '0.75' : '1' }} disabled={this.state.loading} onClick={this.handleLogin} value='Sign In' />
            </div>
            <div className='inputContainer'>
            <GoogleLogin
              clientId="330805585476-2nfa00pd4g5h0j2laimub689l0h82a7l.apps.googleusercontent.com"
              buttonText="Sign in with your Google Account"
              scope="profile email"
              onSuccess={this.handleGSuccess}
              onFailure={this.handleGFailure}
              disabled={this.state.loading}
            />
            </div>
            <div className='errorStyle'>
              {this.state.errorMsg}
            </div>
          </form>
        </div>
    )
  }
}

export default connect((state) => ({}), { storeUserInfo })(Login);

Login.propTypes = {
  storeUserInfo: PropTypes.func.isRequired
}
