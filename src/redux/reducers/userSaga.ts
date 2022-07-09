import {GET_LOGIN, GET_LOGOUT, LOGIN_RECEIVED} from '../actions/actionTypes'
const reducerUser = (state = {}, action: any) => {
  switch (action.type) {
    case GET_LOGIN:
      return { ...state, data: action.data, isLogin: true, loading: false };
    case GET_LOGOUT:
      return { ...state, loading: false, data: null, isLogin: false };
    case LOGIN_RECEIVED:
      if(action.data.status === 200) return { ...state,  data: action.data, isLogin: true, errorLogin: false, loading: false };
      else  return { ...state, isLogin: false, loading: false, errorLogin: true };
    default:
      return state;
  }
};
export default reducerUser;
