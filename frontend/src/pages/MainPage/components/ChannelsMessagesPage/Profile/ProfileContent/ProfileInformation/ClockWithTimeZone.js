import { useState, useEffect } from "react";

const ClockWithTimeZone = (timezone) => {
  const timezoneOffset = Number(timezone);
  const [displayTime, setDisplayTime] = useState("10:00");



  const calculateTime = (timezoneOffset) => {
    const time = new Date();
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + timezoneOffset * 3600000);


    let hour = localTime.getHours().toString();
    hour = hour.length === 1 ? "0" + hour : hour;
    let minute = localTime.getMinutes().toString();
    minute = minute.length === 1 ? "0" + minute : minute;
    setDisplayTime(hour + ":" + minute);
  };

  useEffect(()=>{
    calculateTime(timezoneOffset);
    const timer = setInterval(() => {
      calculateTime(timezoneOffset)
    }, 1000);
    return clearInterval(timer);
  },);


  return displayTime;
};

export default ClockWithTimeZone;
