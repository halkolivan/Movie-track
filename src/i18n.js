import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const languageDetectorOptions = {
  order: ["localStorage", "cookie", "navigator"],
  caches: ["localStorage", "cookie"],
  lookupLocalStorage: "i18nextLng",
  lookupCookie: "i18nextLng",
  cookieMinutes: 10080,
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "ru",
    fallbackLng: "ru",
    debug: true,
    backend: {
      loadPath: "/locales/{{lng}}/translate.json",
    },
    detection: languageDetectorOptions,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
