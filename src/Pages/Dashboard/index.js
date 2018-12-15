import React from 'react';
import css from 'styled-jsx/css';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { message } from 'antd';
import moment from 'moment';
import menuConfig from '../../Components/MenuComponent/menuConfig';
import data from './sampleData';


export default class Dashboard extends React.Component {

  constructor(props){
    super(props)
    this.cards = ['activities', 'medical', 'rewards', 'premium']
    this.state = {...data}
  }
  componentDidMount() {
    Axios.all([this.getPremiumData(), this.getPremiumHistoryData(), this.getRewardsData(), this.getUserActivityData(), this.getCheckupHistory()]).then(Axios.spread( (prem, premHis, rew, ua, ch) => {
      this.setState({
        premium: {
          nextDueAmount: prem.data,
          nextDueDate: moment().add(1, 'M'),
          premiumHistory: premHis.data
        },
        rewards: {
          rewardsTotal: rew.data.points,
          rewardsRedeemed: rew.data.redeemed,
          rewardsLeft: rew.data.points - rew.data.redeemed
        },
        activities: {
          calBurnedLast3Days: [...ua.data]
        },
        medical: {
          history: [...ch.data]
        }
      })
    })).catch( err => {
      message.error(err.response.data.message)
    }) 
  }

  getPremiumData = () => Axios.get(`http://192.168.4.239:8081/api/v1/next-premium/${this.props.userInfo.userid}`)
  getPremiumHistoryData = () => Axios.get(`http://192.168.4.239:8081/api/v1/premium-history/${this.props.userInfo.userid}`)
  getRewardsData = () => Axios.get(`http://192.168.4.239:8081/api/v1/rewards/${this.props.userInfo.userid}`)
  getUserActivityData = () => Axios.get(`http://192.168.4.239:8082/api/v1/user-activity/user/${this.props.userInfo.userid}/pastDays/3`)
  getCheckupHistory = () => Axios.get(`http://192.168.4.239:8082/api/v1/checkup-details/${this.props.userInfo.userid}`)

  renderDashboardCards = (option) => (
    <NavLink key={option} to={menuConfig[option].route}>
      <div className='cardCont'>
        <h2>{menuConfig[option].name}</h2>
        <div>{menuConfig[option].component(this.state[option])}</div>
        <style jsx>{styles}</style>
      </div>
    </NavLink>
  )

  render(){
    return(
      <div className='dashboardCont'>
        {this.cards.map(this.renderDashboardCards)}
        <style jsx>{styles}</style>
      </div>
    )
  }
}

const styles = css`
  .dashboardCont {
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
  }
  .cardCont {
    min-width: 300px;
    min-height: 300px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px 10px;
    margin: 20px 20px;
    box-shadow: 0.75px 0.75px 3px -0.75px #ccc;
  }

`