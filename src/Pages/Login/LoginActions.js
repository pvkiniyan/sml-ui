import { changePWDApi } from "./LoginApis";

export const USER_INFO = 'USER_INFO';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

const storeUserInfo = (userInfo) => ({
  type: USER_INFO,
  payload: userInfo
})

const changePassword = (params) => ({
  type: CHANGE_PASSWORD,
  payload: changePWDApi(params)
})

export {storeUserInfo, changePassword}