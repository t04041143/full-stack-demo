'use strict';

export default class extends think.service.base {
    /**
     *
     * @param args
     */
    init(...args) {
        super.init(...args);
    }

    /**
     * 身份凭证必须不存在，存在则抛异常
     * @param params
     */
    async mustNotExisted(params) {
        let identity = await this.model('user_identification').where({
            type: dict.user.identification.type[params['type']],
            flag: params['flag']
        }).find();

        if (!think.isEmpty(identity)) {
            throw new HttpError(409, think.locale('identity_existed'), 3001);
        }
    }

    /**
     * 身份凭证必须存在，不存在则抛异常
     * @param params
     */
    async mustExisted(params) {
        let identity = await this.model('user_identification').where({
            type: dict.user.identification.type[params['type']],
            flag: params['flag']
        }).find();

        if (think.isEmpty(identity)) {
            throw new HttpError(400, think.locale('identity_verified_failed'), 3002);
        }

        return identity;
    }

    /**
     * 验证用户uid和password是否匹配
     * @param uid
     * @param password
     */
    async identify(uid, password) {
        let user = await this.model('user').where({
            uid: uid,
            hashedPassword: think.md5(password)
        }).find();

        if (think.isEmpty(user)) {
            throw new HttpError(400, think.locale('identity_verified_failed'), 3002);
        }
    }
}