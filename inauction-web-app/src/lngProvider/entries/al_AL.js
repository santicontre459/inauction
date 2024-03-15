import antdAL from "antd/lib/locale-provider/en_US";
import appLocaleData from "react-intl/locale-data/ar";
import alMessages from "../locales/al_AL.json";

const alLang = {
  messages: {
    ...alMessages
  },
  antd: antdAL,
  locale: 'ar',
  data: appLocaleData
};
export default alLang;
