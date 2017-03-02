//import {put, call} from "dva/effects";
//import {signup} from "../services/user";

export default {
    namespace: 'user',

    state: {
        details: {
            roles: {guest: "游客"}
        },
        errors: null
    },

    subscriptions: [],

    effects: {
        // ['user/signup']: function*(action) {
        //   try {
        //     yield put({type: 'user/clear-error'});
        //     let res = yield call(signup, action.payload);
        //     yield put({type: 'user/update', payload: res.data});
        //   } catch (err) {
        //     let res = err.response;
        //     // 更新错误信息
        //     yield put({type: 'user/add-error', error: res.data});
        //   }
        // }
    },

    reducers: {
        update(state, action) {
            return {...state, ...action.payload};
        }
    }
}
