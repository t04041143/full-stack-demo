return {
    ["redis"] = {
        ["host"] = "54.223.185.122",
        ["port"] = 6379,
        ["password"] = "CqmygYsdssJtwmyDtsgx76%98@3@@%%%$",
        ["db"] = 8,
    },
    ["auth"] = {
        ["path"] = {
            ["except"] = {
                ["/api/auth"] = { "POST" },
                ["/api/captcha"] = { "POST" },
                ["^/api/captcha/%d+"] = { "PUT" },
                ["/api/user"] = { "POST" }
            }
        }
    },
}

