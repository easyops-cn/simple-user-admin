import i18next from "i18next";
import { NS_USER_ADMIN } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_USER_ADMIN, en);
i18next.addResourceBundle("zh", NS_USER_ADMIN, zh);
