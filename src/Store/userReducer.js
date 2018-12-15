import typeToReducer from 'type-to-reducer';
import {USER_INFO} from '../Pages/Login/LoginActions';

const initialState = { userInfo: {loggedIn: false} };

const userReducer = typeToReducer({
  [USER_INFO]: (state, action) => Object.assign({}, state, {userInfo: action.payload})
}, initialState)

export default userReducer;