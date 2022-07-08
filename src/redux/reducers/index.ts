import { combineReducers } from 'redux';
import reducerUser from './userSaga';

const reducer = combineReducers ({
  reducerUser,
});

export default reducer;