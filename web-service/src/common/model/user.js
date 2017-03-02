'use strict';
/**
 * model
 */
export default class extends think.model.relation {
    /**
     * 数据表字段定义
     * @type {Object}
     */
    schema = {
        createdAt: { //创建时间
            default: () => { //获取当前时间
                return moment().format("YYYY-MM-DD HH:mm:ss")
            },
            readonly: true //只读，添加后不可修改
        },
        updatedAt: {
            default: () => { //获取当前时间
                return moment().format("YYYY-MM-DD HH:mm:ss")
            }
        }
    };

    // 关联信息
    relation = {
        grants: {
            type: think.model.MANY_TO_MANY,
            model: "auth_item",
            field: "name,type,description",
            key: "uid",
            fKey: "uid",
            rModel: "user_grant",
            rfKey: "authName"
        },
        identifications: {
            type: think.model.HAS_MANY,
            model: "user_identification",
            field: "type,flag,createdAt",
            key: "uid",
            fKey: "uid"
        },
        profile: {
            type: think.model.HAS_ONE,
            model: "user_profile",
            field: "realName,portraitUrl,nickname,gender,birth,updatedAt",
            key: "uid",
            fKey: "uid"
        },
        finance: {
            type: think.model.HAS_ONE,
            model: "user_finance_account",
            field: "balance",
            key: "uid",
            fKey: "uid"
        },
        certificates: {
            type: think.model.HAS_MANY,
            model: "user_certificate",
            key: "uid",
            fKey: "uid"
        }
    };

    init(...args) {
        super.init(...args);
        this.tableName = 'user';
        this.pk = 'uid';
    }
}