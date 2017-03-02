'use strict';

export default class extends think.service.base {
    init(...args) {
        super.init(...args);
    }

    async create(params) {
        // 创建用户信息
        let model = this.model('user');

        let uid = await model.transaction(async() => {
            // 创建用户基本信息
            let hashedPassword = think.md5(params['password']);
            let uid = await model.add({
                status: dict.user.status.active,
                hashedPassword: hashedPassword
            });

            // 赋予角色和权限
            await this.model("user_auth_assignment").add({
                uid: uid,
                authName: 'user'
            });

            // 创建用户身份凭证
            await this.model("user_identification").add({
                uid: uid,
                type: dict.user.identification.type[params['identityType']],
                flag: params['identityFlag']
            });

            // 创建用户简介
            let realName = params['realName'] || null;
            await this.model("user_profile").add({uid: uid, realName: realName});

            // 创建用户资金账号
            await this.model("user_finance_account").add({uid: uid});

            // TODO 创建用户证件

            return uid;
        });

        if (think.isEmpty(uid)) {
            throw new HttpError(500, think.locale('user_create_failed'), 2001);
        }

        return uid;
    }

    async getDetails(uid) {
        let user = await this.model('user').field('uid,status')
            .where({uid: uid}).find();

        // 抽取角色信息
        user.roles = {};
        if (user && user.authorizations) {
            for (let auth of user.authorizations) {
                if (auth.type === 1) {
                    user.roles[auth.name] = auth.description;
                }
            }
        }

        return user;
    }

    async getGrants(uid) {
        let model = this.model('user_grant');
        return await model.field("authName").where({"uid": uid}).select()
    }
}