import {getCaptcha, validateCaptcha} from "../services/captcha";

export default {
  namespace: 'captcha',

  state: {
    value: null,
    purpose: null,
    receiverId: null,
    receiverType: null,
    isVerified: false,
    disabledDuration: 10,
    disabled: false,
    tips: "免费获取",
    errors: null
  },

  subscriptions: {},

  effects: {
    *get({payload}, {put, call, select, take, cancelled}) {
      try {
        yield put({type: 'error/clear'});
        yield call(getCaptcha, payload);

        let {countdown} = require('../utils/event-channels');
        const captcha = yield select(state => state.captcha);
        const chan = yield call(countdown, captcha.disabledDuration);
        try {
          while (true) {
            // take(END) 会导致直接跳转到 finally
            yield take(chan);
            yield put({type: 'countdown'});
          }
        } finally {
          if (yield cancelled()) {
            // 当外部命令终止时，清除channel
            chan.close();
          } else {
            // 定时器倒计时完毕
            yield put({type: 'restore'});
          }
        }
      } catch (err) {
        let res = err.response;
        // 更新错误信息
        yield put({type: 'error/add', payload: {model: 'captcha', error: res.data}});
      }
    },
    *validate({payload}, {put, call}) {
      try {
        yield put({type: 'error/clear'});
        yield call(validateCaptcha, payload);
        yield put({type: 'verified', ...payload});
      } catch (err) {
        let res = err.response;
        // 更新错误信息
        yield put({type: 'error/add', payload: {model: 'captcha', error: res.data}});
      }
    }
  },

  reducers: {
    countdown(state) {
      return {
        ...state,
        disabledDuration: state.disabledDuration - 1,
        disabled: true,
        tips: state.disabledDuration
      };
    },
    unLockButton(state) {
      return {
        ...state,
        disabledDuration: 10,
        disabled: false,
        tips: "免费获取",
        errors: null
      };
    },
    restore() {
      return {
        value: null,
        purpose: null,
        receiverId: null,
        receiverType: null,
        isVerified: false,
        disabledDuration: 10,
        disabled: false,
        tips: "免费获取",
        errors: null
      };
    },
    verified(state, action) {
      return {
        ...state,
        value: action.captcha,
        purpose: action.purpose,
        receiverId: action.receiverId,
        receiverType: action.receiverType,
        isVerified: true
      };
    }
  }
}
