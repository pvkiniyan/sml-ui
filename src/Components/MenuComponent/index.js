import React from 'react';
import { Icon, Tooltip, Avatar } from 'antd';
import { NavLink } from 'react-router-dom';
import css from 'styled-jsx/css';
import menuConfig from './menuConfig';

export default class MenuComponent extends React.Component {

  constructor(props){
    super(props);
    this.options = ['dashboard', 'insurance', 'medical', 'rewards', 'activities', 'premium', 'settings']
  }

  renderOptions = (option, index) => (
    <div key={option} className='menuItem' style={{ borderTop: index !== 0 ? '1px solid rgba(0,0,0,0.1)' : ''}}>
      <Tooltip title={menuConfig[option].name} placement='right'>
        <NavLink key={option} to={menuConfig[option].route}>
          {menuConfig[option].icon}
        </NavLink>
      </Tooltip>
      <style jsx>{styles}</style>
    </div>
  )

  render(){
    return(
      <React.Fragment>
        <h1>SLI</h1>
        <div>
          {this.options.map(this.renderOptions)}
        </div>
        <div>
          <Tooltip title={this.props.userInfo.name} placement="left">
            <div className='userPic'>
            <img style={{width: '100%', height: '100%', objectFit: 'cover'}} alt={this.props.userInfo.name} src={this.props.userInfo.picture} />
            </div>
          </Tooltip>
        </div>
        <style jsx>{styles}</style>
      </React.Fragment>
    )
  }
}

const styles = css`
  .menuItem {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin: auto;
    padding: 20px 0px;
  }
  .userPic {
    width: 40px;
    height: 40px;
    background: #ccc;
    border-radius: 50%;
    overflow: hidden;
  }
`