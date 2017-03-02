'use strict';

export default class extends think.controller.rest {
    error(error) {
        this.http.error = error;

        var status = 500;
        if (!think.isEmpty(error.status)) {
            status = error.status;
        }

        this.http.status(status);

        return think.statusAction(status, this.http);
    }
}