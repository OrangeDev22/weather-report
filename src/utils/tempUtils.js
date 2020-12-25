export const ConvertTemperature = (temperature, unit) => {
  return unit === "celsius" ? temperature : (9 * temperature) / 5 + 32;
};
