import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import {withRouter} from 'react-router';
import Routes from '../Routes';
import MenuComponent from '../Components/MenuComponent';
import Login from '../Pages/Login';
import Logout from '../Pages/Login/Logout';
import styles from './layoutStyles';
import menuConfig from '../Components/MenuComponent/menuConfig';

class Layout extends React.Component{
  
  constructor(props){
    super(props);
  }

  render(){
    const { history } = this.props;
    return(
      <React.Fragment>
        <ModalContainer />
          {this.props.userInfo.loggedIn ? (
            <div className='layoutCont'>
              <div className='sidebarCont'>
                <MenuComponent userInfo={this.props.userInfo} />
              </div>
              <div className='mainCont'>
                <h1 className='headerCont'>
                  {menuConfig[this.props.history.location.pathname.replace('/', '')].name}
                </h1>
                <div className='contentCont'>
                  <Routes history={history} userInfo={this.props.userInfo} />
                </div>
              </div>
            </div>
          ) : <Login />}
          <ModalRoute exact path='*/logout' parentPath={window.location.pathname.replace('/logout',"")} >
            <Logout />
          </ModalRoute>
        <style jsx>{styles}</style>
      </React.Fragment>
    )
  }
}

export default withRouter(connect((state) => ({userInfo: state.userReducer.userInfo}), {})(Layout));

Layout.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired
}

Layout.propTypes = {
  history: PropTypes.object.isRequired 
}
