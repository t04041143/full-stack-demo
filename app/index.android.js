import React from "react";
import {AppRegistry} from "react-native";
import dva from "dva/mobile";
import userModel from "./app/models/user";
import App from "./app";

const app = dva();
app.model(userModel);
app.router(() => <App />);

AppRegistry.registerComponent('myNewReactNative', () => app.start());

// import {initHttpClientConfig} from "./utils/http-client";
// 增加本地化处理
// const appLocale = i18n.zh_cn;
// addLocaleData(appLocale.data);
// ReactDOM.render(
//     <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
//         <AppContainer />
//     </IntlProvider>,
//     document.getElementById('app')
// );
