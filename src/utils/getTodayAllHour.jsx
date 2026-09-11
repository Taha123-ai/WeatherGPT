const getTodayAllHour = (hourly) => {
  if (!hourly) return;
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const currentdate = `${year}-${month}-${day}`;


  const allhrsdata = hourly.filter((item) => {
    const dateandtime = item?.time;
    const [date] = dateandtime.split("T");
    return date === currentdate;
  });
  
  return allhrsdata;
};

export default getTodayAllHour;
