import {
  Sun,
  Moon,
  CloudRain,
  Cloud,
  CloudSun,
  CloudLightning,
  Droplets
} from "lucide-react";

const getWeatherInfo = (code = 0, isDay = 1) => {
  switch (Number(code)) {
    case 0:
      return {
        condition: isDay ? "Clear Sky" : "Clear Night",
        icon: isDay ? (
          <Sun className="w-6 h-6 text-amber-500" />
        ) : (
          <Moon className="w-6 h-6 text-indigo-400" />
        ),
      };
    case 1:
    case 2:
      return {
        condition: "Partly Cloudy",
        icon: <CloudSun className="w-6 h-6 text-amber-500" />,
      };
    case 3:
      return {
        condition: "Overcast",
        icon: <Cloud className="w-6 h-6 text-slate-400" />,
      };
    case 45:
    case 48:
      return {
        condition: "Foggy",
        icon: <Cloud className="w-6 h-6 text-slate-400" />,
      };
    case 51:
    case 53:
    case 55:
      return {
        condition: "Drizzle",
        icon: <Droplets className="w-6 h-6 text-blue-400" />,
      };
    case 61:
    case 63:
    case 65:
      return {
        condition: "Rain",
        icon: <CloudRain className="w-6 h-6 text-blue-500" />,
      };
    case 80:
    case 81:
    case 82:
      return {
        condition: "Rain Showers",
        icon: <CloudRain className="w-6 h-6 text-blue-600" />,
      };
    case 95:
    case 96:
    case 99:
      return {
        condition: "Thunderstorm",
        icon: <CloudLightning className="w-6 h-6 text-amber-500" />,
      };
    default:
      return {
        condition: "Partly Cloudy",
        icon: <CloudSun className="w-6 h-6 text-amber-500" />,
      };
  }
};
export default getWeatherInfo