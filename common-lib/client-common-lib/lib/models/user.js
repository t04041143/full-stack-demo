import {signup} from "../services/user";

export default {
  namespace: 'user',

  state: {
    details: {
      roles: {guest: "游客"}
    },
    errors: null
  },

  subscriptions: {},

  effects: {
    *signup({payload}, {put, call}) {
      try {
        yield put({type: 'error/clear'});
        let res = yield call(signup, payload);
        yield put({type: 'update', payload: res.data});
      } catch (err) {
        let res = err.response;
        // 更新错误信息
        yield put({type: 'error/add', payload: {model: 'user', error: res.data}});
      }
    }
  },

  reducers: {
    update(state, action) {
      return {...state, ...action.payload};
    }
  }
}
