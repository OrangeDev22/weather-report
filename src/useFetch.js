export const fetchLocation = async (city, countryCode, key) => {
  const base = "http://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${city.replace(/ /g, "%20")}${
    countryCode === null ? "" : `,${countryCode}`
  }&units=metric&appid=${key}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data;
};

export const fetchAllInOneCall = async (key, latitude, longitude) => {
  const base = "https://api.openweathermap.org/data/2.5/onecall";
  const query = `?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${key}&units=metric`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data;
};
