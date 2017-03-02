import httpClient from "../utils/http-client";
export async function getCaptcha(params) {
  return httpClient.post('api/captcha', {...params});
}

export async function validateCaptcha(params) {
  return httpClient.put(`api/captcha/${params.captcha}`, {...params});
}
