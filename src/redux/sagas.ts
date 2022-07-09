import { put, takeLatest, all } from 'redux-saga/effects';
import {GET_LOGIN, GET_LOGOUT, LOGIN_RECEIVED} from './actions/actionTypes'
function* fetchLogin(action: any) {
 try {
     // xử lý call api tại đây
   // const response =  yield axios.post(loginUser, {mail: action.email, password:  action.password})
   // yield put({ type: LOGIN_RECEIVED,  data: response.data.data});

    let response =  {"email": "test@gmail.com", "name": "user", "accesstoken": "token", "status": 200};
    if(action.email !== 'test@gmail.com' || action.password !== '12345678'){
        response =  {"email": "", "name": "", "accesstoken": "", "status": 400};
    }
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
