import { useEffect, useState } from "react";
import { UseWindowSizeSize } from "../types";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<UseWindowSizeSize>({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
