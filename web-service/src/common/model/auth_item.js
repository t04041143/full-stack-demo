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

    relation = {
        users: {
            type: think.model.MANY_TO_MANY,
            model: "user",
            key: "name",
            fKey: "authName",
            rModel: "user_grant",
            rfKey: "uid"
        },
        parents: {
            type: think.model.MANY_TO_MANY,
            model: "auth_item",
            key: "name",
            fKey: "child",
            rModel: "auth_item_child",
            rfKey: "parent"
        },
        children: {
            type: think.model.MANY_TO_MANY,
            model: "auth_item",
            key: "name",
            fKey: "parent",
            rModel: "auth_item_child",
            rfKey: "child"
        }
    };

    init(...args) {
        super.init(...args);
        this.tableName = 'auth_item';
    }
}