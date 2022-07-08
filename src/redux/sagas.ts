import { put, takeLatest, all } from 'redux-saga/effects';
import {GET_LOGIN, GET_LOGOUT, LOGIN_RECEIVED} from './actions/actionTypes'
function* fetchLogin(_action: any) {
 try {
     // xử lý call api tại đây
   // const response =  yield axios.post(loginUser, {mail: action.email, password:  action.password})
   // yield put({ type: LOGIN_RECEIVED,  data: response.data.data});

    const response =  {"email": "test@gmail.com", "name": "user", "accesstoken": "token"};
    yield put({ type: LOGIN_RECEIVED,  data: response});
 }catch (e) {
    console.log(e, 'e')
 }
}
function* fetchLogout(_action: any) {
  // console.log('fetch logout')
}
function* loginWatcher() {
  yield takeLatest(GET_LOGIN, fetchLogin)
}
function* logoutWatcher() {
  yield takeLatest(GET_LOGOUT, fetchLogout)
}
export default function* rootSaga() {
  yield all([
    loginWatcher(),
    logoutWatcher()
  ]);
}
