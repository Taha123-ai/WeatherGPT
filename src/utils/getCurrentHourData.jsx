
export const getCurrentHourData = (hourlyData) => {
  if(!hourlyData) return
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");

  const currentTime = `${year}-${month}-${day}T${hour}:00`;
  

  return  hourlyData.find((item) => item.time === currentTime);
};