import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendReq = useCallback(async (reqConfiq, data) => {
    try {
      console.log(reqConfiq);
      setIsLoading(true);

      const response = await fetch(reqConfiq.url, {
        method: reqConfiq.method ? reqConfiq.method : "GET",
        body: reqConfiq.body ? JSON.stringify(reqConfiq.body) : {},

        headers: reqConfiq.headers
          ? reqConfiq.headers
          : { "Content-type": "application/json" },
        credentials: reqConfiq.withCredential ? "include" : "omit",
      });

      
      const responseData = await response.json();
      console.log(responseData,'datain fetch');
      if (!response.ok) throw new Error(responseData.message);


      data(responseData);
      setIsLoading(false);
      setError(null)
    } catch (err) {
      console.log(err.message, "err in fetch");
      setIsLoading(false);
      setError(err.message);
    }
  },[])

  return { isLoading, error, sendReq };
};

export default useFetch;
