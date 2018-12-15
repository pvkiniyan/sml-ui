import React from 'react';
import { Icon, Tooltip } from 'antd';
import { InsuranceHistory, MedicalHistory, Rewards, Activities, Premium } from '../DashboardComponents';

export default {
  'dashboard': {
    name: 'Dashboard',
    icon: <Icon type="dashboard" style={{ fontSize: '20' }} />, 
    route: '/dashboard',
  },
  'insurance': {
    name: 'Insurance History',
    icon: <Icon type="file-protect" style={{ fontSize: '20' }} />,
    route: '/insurance',
    component: (props) =>  <InsuranceHistory {...props} /> 
  },
    'medical': {
    name: 'Medical Checkup History',
    icon: <Icon type="medicine-box" style={{ fontSize: '20' }} />,
    route: '/medical',
    component: (props) =>  <MedicalHistory {...props} />  
  },
    'rewards': {
    name: 'Rewards',
    icon: <Icon type="gift" style={{ fontSize: '20' }} />,
    route: '/rewards',
    component: (props) =>  <Rewards {...props} />  
  },
    'activities': {
    name: 'Activities',
    icon: <Icon type="line-chart" style={{ fontSize: '20' }} />,
    route: '/activities',
    component: (props) =>  <Activities {...props} />  
  },
    'premium': {
    name: 'Premium Table',
    icon: <Icon type="table" style={{ fontSize: '20' }} />,
    route: '/premium',
    component: (props) =>  <Premium {...props} />  
  },
    'settings': {
    name: 'Settings',
    icon: <Icon type="setting" style={{ fontSize: '20' }} />,
    route: '/settings' 
  },
  '': {
    name: '',
    icon: '',
    route: '' 
  },
} 