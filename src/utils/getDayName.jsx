const getDayName = (date) => {
  const today = new Date();
  const givenDate = new Date(date);
  if (
    today.getFullYear() === givenDate.getFullYear() &&
    today.getMonth() === givenDate.getMonth() &&
    today.getDate() === givenDate.getDate()
  ) {
    return "Today";
  }
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
};
export default  getDayName;