'use strict';
/**
 * model
 */
export default class extends think.model.base {
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
        user: {
            type: think.model.BELONG_TO,
            model: "user",
            key: "uid",
            fKey: "uid"
        }
    };

    init(...args) {
        super.init(...args);
        this.tableName = 'user_identification';
    }
}