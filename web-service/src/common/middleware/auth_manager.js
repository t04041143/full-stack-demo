'use strict';
/**
 * middleware
 */
export default class extends think.middleware.base {

    checkGrantRecursive(permission, grants) {
        if (grants.includes(permission.name)) {
            return true;
        } else {
            if (!think.isEmpty(permission.parents)) {
                for (let parent of permission.parents) {
                    if (this.checkGrantRecursive(global.permissionsCache[parent], grants)) {
                        return true
                    }
                }
            }

            return false;
        }
    }

    async loadPermissionsData() {
        if (think.isEmpty(global.permissionsCache)) {
            let allPermissions = await this.model('auth_item').setRelation("users", false)
                .field('name,type').where({active: 1}).select();

            global.permissionsCache = {};
            for (let p of allPermissions) {
                permissionsCache[p.name] = {name: p.name};

                permissionsCache[p.name].parents = [];
                for (let parent of p.parents) {
                    permissionsCache[p.name].parents.push(parent.name);
                }
            }
        }
    }

    /**
     * run
     * @return {} []
     */
    async run() {
        await this.loadPermissionsData();

        let permission = global.permissionsCache[`${this.http.method.toLowerCase()} ${this.http.module}/${this.http.controller}`];

        if (!think.isEmpty(permission)) {
            let uid = this.http.header('x-uid');

            if (uid) {
                let userGrants = await this.model('user_grant').getGrants(uid);
                userGrants = userGrants.map(g => {
                    return g.authName
                });

                if (!this.checkGrantRecursive(permission, userGrants)) {
                    this.http.status(403);
                    this.http.error = new HttpError(403, '你没有权限访问', 2001);
                    return think.statusAction(403, this.http);
                }
            } else {
                this.http.status(403);
                this.http.error = new HttpError(403, '你没有权限访问', 2001);
                return think.statusAction(403, this.http);
            }
        }
    }
}