import {eventChannel, END} from "redux-saga";

function countdown(secs) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        if (secs > 0) {
          emitter(secs);
        } else {
          // 结束 channel
          emitter(END);
          clearInterval(iv);
        }

        secs -= 1;
      }, 1000);

      // 返回一个 unsubscribe 方法
      return () => {
        clearInterval(iv)
      }
    }
  )
}

export {countdown};
