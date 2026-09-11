import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addselectedlatitude, addselectedlocation, addselectedlongitude } from "../store/Selectedlocslice";
import { clearlocationslice } from "../store/locationslice";

const useGeocoding = () => {
  const languageMap = {
    EN: "en",
    HI: "hi",
    TA: "ta",
    BN: "bn",
    TE: "te",
    MR: "mr",
  };
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const userlanguage = useSelector((store) => store?.user?.language);
  const language = languageMap?.[userlanguage];

  const getLocationgeocoding = async (city) => {
    if (!city?.trim()) {
      setError("Please enter a city name.");
      setLocation(null);
      return null;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city.trim(),
        )}&count=1&language=${language}&format=json`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch location.");
      }

      const data = await response.json();

      const result = data?.results?.[0];

      if (!result) {
        setError("City not found.");
        setLocation(null);
        return null;
      }

      if (
        typeof result.latitude !== "number" ||
        typeof result.longitude !== "number"
      ) {
        setError("Invalid location data.");
        setLocation(null);
        return null;
      }

      const locationData = {
        city: result?.name ,
        state: result?.admin1 ,
        country: result?.country ,
        latitude: result?.latitude,
        longitude: result?.longitude,
      };
      setLocation(locationData);
      dispatch(addselectedlongitude(locationData?.longitude));
      dispatch(addselectedlatitude(locationData?.latitude));
      dispatch(addselectedlocation(locationData?.city || locationData?.state))
      dispatch(clearlocationslice());
      
      
    } catch (err) {
      console.error("Location error:", err);

      setError("Unable to find location. Please try again.");
      setLocation(null);

      return null;
    } finally {
      setLoading(false);
    }
  };

  
  return {
    location,
    loading,
    error,
    clearError: () => setError(""),
    getLocationgeocoding,
  };
};

export default useGeocoding;
