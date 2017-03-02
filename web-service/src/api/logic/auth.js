'use strict';

export default class extends think.logic.base {
    postAction() {
        let rules = {
            type: {required: true, string: true, in: Object.keys(dict.user.identification.type)},
            flag: {required: true, string: true},
            password: {
                requiredIf: ['identityType', dict.user.identification.type.email, dict.user.identification.type.mobile],
                required: true,
                string: true,
                length: 16
            }
        };

        let flag = this.validate(rules);
        if (!flag) {
            this.status(400);
            return this.fail(1001, this.locale('validate_req_params_failed'), this.errors());
        }
    }
}