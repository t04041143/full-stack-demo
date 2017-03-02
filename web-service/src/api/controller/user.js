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
        this.userService = new (think.service('user'));
        this.identityService = new (think.service('user_identification'));
        this.accessTokenService = new (think.service('access_token'));
    }

    async postAction() {
        try {
            // 校验身份凭证是否已经被注册
            await this.identityService.mustNotExisted({
                type: this.post('identityType'),
                flag: this.post('identityFlag')
            });

            // 检查校验码是否有效
            await this.captchaService.verify({
                receiverId: this.post('identityFlag'),
                captcha: this.post('captcha'),
                purpose: 'register'
            });

            // 校验码如果有效，则新建用户信息
            let uid = await this.userService.create(this.post());

            // 生成令牌
            let token = await this.accessTokenService.create(uid);

            // 用户信息
            let details = await this.userService.getDetails(uid);
            this.success({details: details, accessToken: token});
        } catch (err) {
            return this.error(err);
        }
    }

    async getAction() {
        let targetUid = this.get('uid');
        let requesterUid = this.header("x-uid");

        // 指定uid不为空则为单个查询，如果为空，则为批量查询
        if (targetUid.includes(',')) {
            // todo
            return this.success();
        } else {
            try {
                let details = await this.userService.getDetails(targetUid);

                if (targetUid != requesterUid) {
                    delete details.identifications;
                    delete details.finance;
                }

                return this.success(details);
            } catch (err) {
                return this.error(err);
            }
        }
    }
}