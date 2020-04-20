import React from "react";
import { useTranslation } from "react-i18next";
import { NS_USER_ADMIN, K } from "../i18n/constants";
import moment from "moment";

export interface TickingTimeProps {
  isPause?: boolean;
}

const formatTime = (m: moment.Moment): string => {
  return m.format("YYYY-MM-DD HH:mm:ss");
};

export function TickingTime(props: TickingTimeProps): React.ReactElement {
  const { t } = useTranslation(NS_USER_ADMIN);
  const current = moment();
  const [time, setTime] = React.useState(formatTime(current));
  const timer = React.useRef<any>(0);

  const updateTime = (t: string) => {
    const dTime = formatTime(moment(t).add(1, "s"));
    setTime(dTime);
    timer.current = setTimeout(() => updateTime(dTime), 1000);
  };

  React.useEffect(() => {
    if (props.isPause) {
      clearTimeout(timer.current);
    } else {
      timer.current = setTimeout(() => updateTime(time), 1000);
    }
    return () => clearTimeout(timer.current);
  }, [props.isPause]);

  return <div>{time}</div>;
}
