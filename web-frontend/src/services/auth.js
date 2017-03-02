import httpClient from "../utils/http-client";
import {md5} from "utility";

export async function signin(params) {
  let signinInfo = {...params};

  // 加密密码
  signinInfo.password = md5(signinInfo.password);

  return httpClient.post('api/auth', signinInfo);
}
