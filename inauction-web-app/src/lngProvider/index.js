import enLang from "./entries/en-US";
import alLang from "./entries/al_AL";
import zhLang from "./entries/zh-Hans-CN";
import itLang from "./entries/it_IT";
import esLang from "./entries/es_ES";
import frLang from "./entries/fr_FR";
import {addLocaleData} from "react-intl";

const AppLocale = {
  en: enLang,
  al: alLang,
  zh: zhLang,
  it: itLang,
  es: esLang,
  fr: frLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.al.data);
addLocaleData(AppLocale.zh.data);
addLocaleData(AppLocale.it.data);
addLocaleData(AppLocale.es.data);
addLocaleData(AppLocale.fr.data);

export default AppLocale;
