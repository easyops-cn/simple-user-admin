import React from "react";
import { useTranslation } from "react-i18next";
import { NS_USER_ADMIN, K } from "../i18n/constants";

export function UserAdmin(): React.ReactElement {
  const { t } = useTranslation(NS_USER_ADMIN);

  return <div>{t(K.USER_ADMIN)} works!</div>;
}
