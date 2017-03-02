import React from "react";
import ReactDOM from "react-dom";
import {IntlProvider} from "react-intl";
import dva from "dva";
import i18n from "./i18n";
import {models, utils} from "@lecity/client-common-lib";

// 初始化HTTP客户端参数
utils.httpClient.initConfig();

// 初始化dva
const app = dva();

// 加载model
app.model(models.error);
app.model(models.auth);
app.model(models.user);

// 加载路由
app.router(require('./router'));

// 启动应用
const AppContainer = app.start();

// 增加本地化处理
const appLocale = utils.polyfill(i18n);
ReactDOM.render(
  <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
    <AppContainer />
  </IntlProvider>,
  document.getElementById('app')
);
