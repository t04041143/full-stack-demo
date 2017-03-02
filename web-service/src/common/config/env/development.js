'use strict';

export default {
    cache: {
        type: "redis", //缓存类型
        timeout: 6 * 3600, //失效时间，单位：秒
        adapter: { //不同 adapter 下的配置
            redis: {
                prefix: ''
            }
        }
    },
    redis: {
        host: 'XXXXXXXXXXXXXXXX',
        port: 6379,
        password: 'XXXXXXXXXXXXX',
        timeout: 0,
        log_connect: true,
        db: 0
    },
    db: {
        type: 'mysql',
        adapter: {
            mysql: {
                host: 'XXXXXXXXXXXXXXXXX',
                port: '3306',
                database: 'mydb',
                user: 'root',
                password: 'XXXXXXXXXXXXXXXXX',
                prefix: '',
                encoding: 'utf8'
            }
        }
    }
};