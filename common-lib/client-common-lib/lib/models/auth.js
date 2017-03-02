import {signin} from "../services/auth";

export default {
  namespace: 'auth',

  state: {
    loginId: null,
    loginIdType: null,
    password: null,
    errors: null
  },

  subscriptions: {},

  effects: {
    *signin(action, {put, call}) {
      try {
        yield put({type: 'error/clear'});
        let res = yield call(signin, action.payload);
        yield put({type: 'user/update', payload: res.data});
      } catch (err) {
        let res = err.response;
        // 更新错误信息
        yield put({type: 'error/add', payload: {model: 'auth', error: res.data}});
      }
    }
  },

  reducers: {}
}
