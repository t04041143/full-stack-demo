'use strict';

export default class extends think.logic.base {
    postAction() {
        let rules = {
            receiverId: {required: true, string: true},
            receiverType: {required: true, string: true, in: Object.keys(dict.captcha.receiverType)},
            purpose: {required: true, string: true, in: Object.keys(dict.captcha.purpose)}
        };

        let flag = this.validate(rules);
        if (!flag) {
            this.status(400);
            return this.fail(1001, this.locale('validate_req_params_failed'), this.errors());
        }
    }

    putAction() {
        let rules = {
            receiverId: {required: true, string: true},
            purpose: {required: true, string: true, in: Object.keys(dict.captcha.purpose)},
            captcha: {required: true, get: true}
        };

        let flag = this.validate(rules);
        if (!flag) {
            this.status(400);
            return this.fail(2001, this.locale('validate_captcha_failed'), this.errors());
        }
    }
}