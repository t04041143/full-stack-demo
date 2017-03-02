'use strict';
/**
 * model
 */
export default class extends think.model.relation {
    schema = {
        createdAt: { //创建时间
            default: () => { //获取当前时间
                return moment().format("YYYY-MM-DD HH:mm:ss")
            },
            readonly: true //只读，添加后不可修改
        }
    };

    // relation = {
    //     user: {
    //         type: think.model.BELONG_TO,
    //         model: "user",
    //         key: "uid",
    //         fKey: "uid"
    //     },
    //     authItem: {
    //         type: think.model.BELONG_TO,
    //         model: "auth_item",
    //         key: "authName",
    //         fKey: "name"
    //     }
    // };

    init(...args) {
        super.init(...args);
        this.tableName = 'user_grant';
        //this.pk = ['uid', 'authName'];
    }

    async getGrants(uid) {
        return await this.field("authName").where({"uid": uid}).select();
    }
}