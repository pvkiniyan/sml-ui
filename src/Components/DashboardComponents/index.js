import React from 'react';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import moment from 'moment';
import css from 'styled-jsx/css'; 

const InsuranceHistory = (props) => (
  <div style={{height: '400px'}}>
    {props.insuranceHistory.map((ins, index) => (
      <h4 key={ins.name} className='insCont' style={{borderTop: index !== 0 ? '1px solid rgb(0,0,0,0.05)' : ''}}>
        <div>{`${ins.id} - ${ins.type}`}</div>
        <div>{`Purchased on ${new Date(ins.purchaseDate).toLocaleString()}`}</div>
        <div>{`Expires on ${new Date(ins.expiryDate).toLocaleString()}`}</div>
      </h4>
    ))}  
    <style jsx>{styles}</style>
  </div>
);

const MedicalHistory = (props) => (
  <h4 className="medCont">
    {props.history.map((his, index) => (
      <div key={index.toString()}>
        <div>{`Medical checkup done on ${new Date(his.checkupDate).toLocaleString()}`}</div>
        <div>{`By ${his.doctorName}`}</div>
        <div>{his.details.map(detail => <div key={detail.parameter}>{`${detail.parameter} - ${detail.value}`}</div>)}</div>
      </div>
    ))}
    
    <style jsx>{styles}</style>
  </h4>
);

const Rewards = (props) => (
  <h4 className="rewardsCont">
    <div>
      {`Rewards earned - ${props.rewardsTotal}`}
    </div>
    <div>
      {`Rewards points redeemed - ${props.rewardsRedeemed}`}
    </div>
    <div>
      {`Rewards points left - ${props.rewardsLeft}`}
    </div>
    <style jsx>{styles}</style>
  </h4>
);

const Activities = (props) => (
  <div style={{width:'800px', height: '400px'}}>
    <h3>
      Activity Entry Chart for last 3 days - Time x Calories Burned
    </h3>
    <div className="chartCont">
      <LineChart data={props.calBurnedLast3Days.reduce((acc, val, i) => ({...acc, [moment(val.createdAt)]: val.totalCalories}), {})} />
    </div>
    <style jsx>{styles}</style>
  </div>
);

const Premium = (props) => (
  <h4 className="premiumCont">
    <div>{`Next Premium Due Date - ${new Date(props.nextDueDate).toLocaleString()}`}</div>
    <div>{`Next Premium Amount - ${props.nextDueAmount}`}</div>
    <div>Premium History</div>
    <div>{props.premiumHistory.map((his,index) => (
      <div key={his.id}>
        <div>{`Premium Deducted ${his.moneyDeducted} at ${new Date(his.createdAt).toLocaleString()}`}</div>
        <div>{`Reward points redeemed - ${his.rewardsRedeemed}`}</div>
      </div>
      ))}
    </div>
    <style jsx>{styles}</style>
  </h4>
);

export {InsuranceHistory, MedicalHistory, Rewards, Activities, Premium}

const styles = css`
  .chartCont {
    padding: 15px 0px;
  }
  .insCont {
    margin: 10px 0px;
    padding: 15px 15px;
    display: flex;
    flex-direction: column;
  }
  .insCont > div, .medCont > div, .rewardsCont > div, .premiumCont > div {
    padding: 5px 0px;
  }
  .insCont {
    flex-grow: 1;
  }
`;