import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addlocation,  } from "../store/locationslice";
import { addselectedlocation,  } from "../store/Selectedlocslice";

const languageMap = {
  EN: "en",
  HI: "hi",
  TA: "ta",
  BN: "bn",
  TE: "te",
  MR: "mr",
};

function useGetCityName() {
  const dispatch = useDispatch();
  const source = useSelector((store) => store?.locationsource?.source);
  const lat = useSelector((store) => {
    return source === "search"
      ? store?.selectedlocation?.latitude
      : store?.userlocation?.latitude;
  });

  const lon = useSelector((store) => {
    return source === "search"
      ? store?.selectedlocation?.longitude
      : store?.userlocation?.longitude;
  });
  const userlanguage = useSelector((store) => store?.user?.language);
  const language = languageMap?.[userlanguage];

  useEffect(() => {
    if (!lat || !lon) return;
    const fetchcityname = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1&accept-language=${language}`,
        );

        if (!response.ok) {
          throw new Error("Failed to get city name");
        }

        const data = await response.json();

        if (source === "search") {
          dispatch(
            addselectedlocation({
              address: data?.address,
              name: data?.display_name,
            }),
          )
        } else {
          dispatch(
            addlocation({
              address: data?.address,
              name: data?.display_name,
            }),
          )
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchcityname();
  }, [lat, lon, language, source, dispatch]);
}

export default useGetCityName;
