export const getLocationName = (data) => {
  if (!data) return "Fetching...";

  const place =
    data.city ||
    data.town ||
    data.village ||
    data.municipality ||
    data.county ||
    data.state_district ||
    data.state;

  if (!place) return "Fetching...";

  return data.road ? `${data.road}, ${place}` : place;
};