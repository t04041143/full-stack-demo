import httpClient from "../utils/http-client";
import {md5} from "utility";

/**
 * 用户注册
 * @param params 包含字段captcha identityFlag identityType password
 * @returns {axios.Promise}
 */
export async function signup(params) {
  let signupInfo = {...params};

  // 加密密码
  signupInfo.password = md5(signupInfo.password);

  return httpClient.post('api/user', signupInfo);
}
