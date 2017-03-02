import {addLocaleData} from "react-intl";

export default function (i18n) {
  // Polyfill
  const areIntlLocalesSupported = require('intl-locales-supported');
  const localesMyAppSupports = ['zh-CN', 'en-US'];

  if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
      // `Intl` exists, but it doesn't have the data we need, so load the
      // polyfill and patch the constructors we need with the polyfill's.
      /* eslint-disable global-require */
      const IntlPolyfill = require('intl');
      /* eslint-enable global-require */
      Intl.NumberFormat = IntlPolyfill.NumberFormat;
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
  } else {
    // No `Intl`, so use and load the polyfill.
    /* eslint-disable global-require */
    global.Intl = require('intl');
    /* eslint-enable global-require */
  }

  const isZhCN = (typeof localStorage !== 'undefined' && localStorage.getItem('locale') !== 'en-US');
// (typeof localStorage !== 'undefined' && localStorage.getItem('locale') === 'zh-CN') ||
// (navigator.language === 'zh-CN');

  const appLocale = isZhCN ? i18n.zh_cn : i18n.en_us;
  addLocaleData(appLocale.data);

  return appLocale;
}
