'use strict';

export default class extends think.service.base {
    init(...args) {
        super.init(...args);
    }

    async create(params) {
        let cacheKey = `${params['receiverId']}_${params['purpose']}`;
        let captcha = await think.cache(
            cacheKey,
            undefined,
            {type: "redis"}
        );

        if (!think.isEmpty(captcha)) {
            messager[params['receiverType']].sendCaptcha(params['receiverId'], captcha);
        } else {
            let captcha = _.random(100000, 999999);
            // 如果校验码不存在，那么产生新的校验码，并发送
            think.cache(cacheKey, ()=> {
                return captcha;
            }, {type: "redis"}).then(captcha=> {
                messager[params['receiverType']].sendCaptcha(params['receiverId'], captcha);
            });
        }
    }

    async verify(params) {
        let cacheKey = `${params['receiverId']}_${params['purpose']}`;

        let captcha = await think.cache(cacheKey, undefined, {type: "redis"});

        if (think.isEmpty(captcha) || captcha != params['captcha']) {
            throw new HttpError(400, think.locale('validate_captcha_failed'), 2001);
        }
    }

    delete(params) {
        let cacheKey = `${params['receiverId']}_${params['purpose']}`;
        think.cache(cacheKey, null, {type: "redis"});
    }
}