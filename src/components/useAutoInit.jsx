// useAutoInit.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useAutoInit = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);
};

export default useAutoInit;
