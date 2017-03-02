'use strict';
import Base from "./base.js";
/**
 * rest controller
 * @type {Class}
 */
export default class extends Base {

    init(http) {
        super.init(http);
        this.identityService = new (think.service('user_identification'));
        this.accessTokenService = new (think.service('access_token'));
        this.userService = new (think.service('user'));
    }

    /**
     * before magic method
     * @return {Promise} []
     */
    __before() {

    }

    async postAction() {
        try {
            // 身份凭证必须存在
            let identity = await this.identityService.mustExisted({
                type: this.post('type'),
                flag: this.post('flag')
            });

            // 验证密码是否正确
            await this.identityService.identify(identity['uid'], this.post('password'));

            // 生成令牌
            let token = await this.accessTokenService.create(identity['uid']);

            let details = await this.userService.getDetails(identity['uid']);
            this.success({details: details, accessToken: token});
        } catch (err) {
            this.error(err);
        }
    }
}