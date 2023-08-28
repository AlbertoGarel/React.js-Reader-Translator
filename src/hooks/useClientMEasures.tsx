import { useState, useEffect } from "react";
import { Breakpoints } from "../types/breakpoints.d";

interface UseClientMeasures {
  deviceHeight: number;
  deviceWidth: number;
}

export default function useClientMeasures() {
  const [measures, getMeasures] = useState<UseClientMeasures>({
    deviceHeight: 0,
    deviceWidth: 0,
  });
  const [deviceType, setDeviceType] = useState<string>("");

  useEffect(() => {
    const { innerHeight, innerWidth } = window;
    getMeasures({ deviceHeight: innerHeight, deviceWidth: innerWidth });

    const styleContainer = (devicewidth: number): void => {
      let deviceType: string = "desktop";

      if (devicewidth <= Breakpoints.Mobile) {
        deviceType = "mobile";
      } else if (
        devicewidth > Breakpoints.Mobile &&
        devicewidth <= Breakpoints.Tablet
      ) {
        deviceType = "tablet";
      } else {
        deviceType = "desktop";
      }

      setDeviceType(deviceType);
    };

    styleContainer(innerWidth);
    window.addEventListener("resize", () => styleContainer(window.innerWidth));

    return () =>
      window.removeEventListener("resize", () =>
        styleContainer(window.innerWidth)
      );
  }, [measures.deviceWidth]);

  return { measures, deviceType };
}
