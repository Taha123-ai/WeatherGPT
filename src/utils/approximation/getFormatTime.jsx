export const getFormatTime = (dateTime) => {
  if (!dateTime) return "--";

  return new Date(dateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};