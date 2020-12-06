import { useState, useEffect, useCallback } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);

  const getDetails = useCallback(async () => {
    const response = await fetch(url);
    const details = await response.json();
    setDetails(details);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getDetails();
  }, [url, getDetails]);
  return { loading, details };
};
