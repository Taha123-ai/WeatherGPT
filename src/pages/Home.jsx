import Shimmer from "./Shimmer";
import Dashboard from "../components/dashboard/Dashboard";
import useMeteodata from "../Hooks/useMeteodata";
import useLocation from "../Hooks/useLocation";
import Error from "./Error";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Location from "./Location";

const Home = () => {

  const { initLocation } = useLocation();
  useEffect(() => {
    initLocation();
  }, [initLocation]);

  const hourlydata = useMeteodata();

  const status = useSelector((store) => store?.userlocation?.status);
  const source = useSelector((store) => store?.locationSource?.source);
  const longitude = useSelector((store) => {
    return source === "search"
      ? store?.selectedlocation?.latitude
      : store?.userlocation?.latitude;
  });


  return (
    <>
      {status === "loading" && <Shimmer />}
      {(status === "granted" || status === "prompt" || longitude) && <Dashboard hourlydata={hourlydata} />}
      {status === "denied" && !longitude && <Location />}
      {status === "error" && <Error />}
    </>
  );
};

export default Home;
