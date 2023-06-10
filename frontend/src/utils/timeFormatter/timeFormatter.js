function formatTime(time) {
  const localTime = new Date(time);
  const month = localTime.toLocaleString("en-AU", { month: "short" });
  const day = localTime.getDate();
  const displayDate = day + " " + month;

  const date = localTime.toDateString();
  const today = Date.parse(new Date());
  const msgDate = Date.parse(date);
  const diffDate = Math.floor((today - msgDate) / (60 * 60 * 24 * 1000));
  const displayTime = localTime.toLocaleString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return { 0: displayTime, 1: "Yesterday" }[diffDate] || displayDate;
}

export { formatTime };
