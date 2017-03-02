'use strict';
/**
 * model
 */
export default class extends think.model.relation {
    init(...args) {
        super.init(...args);
        this.tableName = 'auth_item_child';
    }
}