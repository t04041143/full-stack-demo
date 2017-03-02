'use strict';

export default class extends think.service.base {
    init(...args) {
        super.init(...args);
    }

    async create(uid) {
        var createdTime = moment().format('X');
        var token = new Buffer(`${uid},${createdTime}`).toString('base64');

        var seed = think.uuid(6);

        token = new Buffer(`${seed}${token}`).toString('base64');

        await think.cache(`access_token:${token}`, {uid: uid, createdAt: createdTime}, {
            type: "redis",
            timeout: think.config('auth.accessToken').expire
        });

        return token;
    }
}