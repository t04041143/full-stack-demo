'use strict';

export default class extends think.logic.base {
    postAction() {
        let rules = {
            identityFlag: {required: true, string: true},
            identityType: {required: true, string: true, in: Object.keys(dict.user.identification.type)},
            certType: {string: true, in: Object.keys(dict.user.certificate.type)},
            certNumber: {string: true},
            realName: {string: true, length: [2, 12]},
            password: {required: true, string: true, length: 16},
            captcha: {required: true, length: 6}
        };

        let flag = this.validate(rules);
        if (!flag) {
            this.status(400);
            return this.fail(1001, this.locale('validate_req_params_failed'), this.errors());
        }
    }

    getAction() {
        let rules = {
            uid: {required: true}
        };

        let flag = this.validate(rules);
        if (!flag) {
            this.status(400);
            return this.fail(1001, this.locale('validate_req_params_failed'), this.errors());
        }
    }
}