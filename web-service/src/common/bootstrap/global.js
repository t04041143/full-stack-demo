import fs from "fs";
import log4js from "log4js";
import nodemailer from "nodemailer";

global._ = require('lodash');
global.moment = require('moment');

// todo 初始化日志工具
global.logger = log4js.getLogger();

// 定义错误类型
global.HttpError = function (status, message, code) {
    this.message = message || '';
    this.status = status;
    this.code = code || 0;
};
global.HttpError.prototype = new Error();


// 初始化全局字典
//noinspection JSUnresolvedVariable
global.dict = {};
var dictFileNameList = fs.readdirSync(`${think.ROOT_PATH}/app/common/config/dictionary`);
for (let fileName of dictFileNameList) {
    if (fileName.endsWith('.js')) {
        let dictKey = fileName.substring(0, fileName.indexOf('.'));
        global.dict[dictKey] = require(`${think.ROOT_PATH}/app/common/config/dictionary/${fileName}`);
    }
}
think.log("全局字典初始化完毕", "BOOTSTRAP");

let mailerConfig = think.config("email");

let email = {
    sender: nodemailer.createTransport({
        host: mailerConfig.host,
        port: mailerConfig.port,
        pool: true,
        secure: true,
        auth: {
            user: mailerConfig.account, // 账号
            pass: mailerConfig.pass // 密码
        }
    }),
    sendCaptcha: function (direction, captcha) {
        this.sender.sendMail({
            from: mailerConfig.from,
            to: direction,
            subject: think.locale('email_title_captcha'),
            text: '',
            html: `<p>您好,</p><br/><p>${captcha}</p><p>请尽快使用上面的验证码注册账号。</p><p><br/>${think.locale('email_sender_opt')}</p>`
        }, function (error, info) {
            if (error) {
                // todo logger要修改
                return console.log(error);
            }
            console.log(`Message sent: ${info.response}`);
        });
    }
};

let mobile = {
    sender: {},
    sendCaptcha: function (direction, captcha) {
        console.log(`向${direction}发送验证码${captcha}`);
    }
};

global.messager = {email, mobile};