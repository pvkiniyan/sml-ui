import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import Dashboard from '../Pages/Dashboard';
import Images from '../Images';
import MedicalCheckup from '../Pages/MedCheckup';

class Routes extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const {userInfo} = this.props
    return(
      <Switch>
        <Route
          path="/"
          key="/"
          exact
          history={this.props.history}
          render={(props) => <Redirect to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          key="/dashboard"
          exact
          history={this.props.history}
          render={(props) => <Dashboard {...props} userInfo={userInfo} />}
        />
        <Route
          path="/medical"
          key="/medical"
          exact
          history={this.props.history}
          render={(props) => <MedicalCheckup {...props} userInfo={userInfo} />}
        />
        <Route exact path="*" component={() => (<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img style={{width: '300px', height: '300px', objectFit: 'contain'}}alt="Under Construction" src={Images.UNDER_CONSTRUCTION} /></div>)} />
      </Switch>

    )
  }
}


Routes.propTypes = {
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired
};

export default Routes;