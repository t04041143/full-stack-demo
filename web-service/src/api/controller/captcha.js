'use strict';

import Base from "./base.js";

export default class extends Base {
    /**
     *
     * @param http
     */
    init(http) {
        super.init(http);
        this.captchaService = new (think.service('captcha'));
        this.identityService = new (think.service('user_identification'));
    }

    /**
     * before magic method
     * @return {Promise} []
     */
    __before() {

    }

    async postAction() {
        let receiverType = this.post('receiverType');
        let receiverId = this.post('receiverId');
        let purpose = this.post('purpose');

        try {
            // 校验身份凭证是否被注册
            await this.identityService.mustNotExisted({type: receiverType, flag: receiverId});

            // 如果没有注册那么生成验证码
            await this.captchaService.create({receiverType, receiverId, purpose});

            this.success();
        } catch (err) {
            return this.error(err);
        }
    }

    async putAction() {
        let receiverId = this.post('receiverId');
        let purpose = this.post('purpose');
        let captcha = this.get('captcha');

        try {
            await this.captchaService.verify({receiverId, purpose, captcha});
            this.success();
        } catch (err) {
            return this.error(err);
        }
    }
}