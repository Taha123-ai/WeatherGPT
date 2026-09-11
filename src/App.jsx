import { Outlet } from "react-router-dom";
  import WeatherNavbar from "./components/common/WeatherNavbar";

const App = () => {
  return (
    <div>
      <WeatherNavbar />
      <Outlet />
    </div>
  );
};

export default App;
