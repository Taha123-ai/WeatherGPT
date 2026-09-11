import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addlatitude, addlongitude, addstatus } from "../store/locationslice";
import { clearselectedlocationslice } from "../store/Selectedlocslice";


const useLocation = () => {
  const dispatch = useDispatch();
  const [isLocating, setIsLocating] = useState(false);

  const userlocation = useSelector(
    (store) => store?.userlocation
  );

    const selectedlocation = useSelector((store) => store?.selectedlocation);

  const getlocation = useCallback(() => {
    setIsLocating(true);

    if (!navigator.geolocation) {
      setIsLocating(false);
      return;
    }
    if (
      userlocation?.latitude != null &&
      userlocation?.longitude != null
    ) {
       setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(addstatus("granted"));
        dispatch(addlongitude(position.coords.longitude));
        dispatch(addlatitude(position.coords.latitude));
        dispatch(clearselectedlocationslice());
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);

        if (error.code === 1) {
          dispatch(addstatus("denied"));
        } else {
          dispatch(addstatus("error"));
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 300000,
      }
    );
  }, [userlocation,dispatch]);

  const initLocation = useCallback(() => {
    
    if (
      selectedlocation?.latitude != null &&
      selectedlocation?.longitude != null
    ) {
      return;
    }

    getlocation();
  }, [ selectedlocation,getlocation]);

  return {
    getlocation,
    initLocation,
    isLocating,
  };
};

export default useLocation;
