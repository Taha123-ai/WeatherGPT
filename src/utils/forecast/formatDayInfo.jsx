const formatDayInfo = (dateStr, index) => {
  if (!dateStr) return { day: `Day ${index + 1}`, fullDate: "" };
  const d = new Date(`${dateStr}T00:00:00`);
  if (isNaN(d.getTime())) return { day: dateStr, fullDate: dateStr };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const fullDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayTitle =
    index === 0 ? "Today" : index === 1 ? "Tomorrow" : dayNames[d.getDay()];
  const fullDate = `${fullDays[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;

  return { day: dayTitle, fullDate };
};
export default formatDayInfo;