export const getComfortLevel = (temperature, feelsLike) => {
  if (!temperature) return null;

  const difference = feelsLike - temperature;

  // Very cold conditions
  if (feelsLike < 10) return 0;

  // Cold conditions
  if (feelsLike < 18) return 1;

  // Cool conditions
  if (feelsLike < 22) return 2;

  // Comfortable conditions
  if (feelsLike < 28) {
    if (difference >= 3) return 4; // feels warmer than actual
    if (difference <= -3) return 2; // feels cooler than actual
    return 3;
  }

  // Warm conditions
  if (feelsLike < 32) return 4;

  // Hot conditions
  if (feelsLike < 36) return 5;

  // Very hot conditions
  if (feelsLike < 40) return 6;

  // Extremely hot conditions
  return 7;
};
