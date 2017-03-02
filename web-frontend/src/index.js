import React from "react";
import ReactDOM from "react-dom";
import {IntlProvider} from "react-intl";
import dva from "dva";
import polyFillIntl from "./utils/polyfill";
import {initHttpClientConfig} from "./utils/http-client";

// 初始化HTTP客户端参数
initHttpClientConfig();

// 初始化dva
const app = dva();

// 加载model
app.model(require('./models/menu'));
app.model(require('./models/captcha'));
app.model(require('./models/user'));
app.model(require('./models/auth'));
app.model(require('./models/error'));

// 加载路由
app.router(require('./router'));

// 启动应用
const AppContainer = app.start();

// 增加本地化处理
const appLocale = polyFillIntl();
ReactDOM.render(
  <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
    <AppContainer />
  </IntlProvider>,
  document.getElementById('app')
);
