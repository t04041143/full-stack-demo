export default [
    [/^api\/captcha\/(\d+)$/, {
        put: "api/captcha/put?captcha=:1"
    }],
    [/^api\/user\/(\d+)$/, {
        get: "api/user/get?uid=:1"
    }]
];