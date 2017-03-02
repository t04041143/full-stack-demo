--local cjson = require 'cjson'
--local ts = require 'utils'
require("cors");

--local config = ngx.shared.config;

--local file, err = io.open("config.json", "r");
--
--if err then
--    ngx.log(0, 'load config file err : ' .. err)
--else
--    local content = cjson.decode(file:read("*all"));
--    file:close();
--
--    for name, value in pairs(content) do
--        config:set(name, value);
--    end
--
--    ngx.log(0, 'load config file success')
--end