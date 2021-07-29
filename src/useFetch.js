import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count,setCount] = useState(0);
  useEffect(() => {
    const abortCont = new AbortController(); //to abort the fetch going on when the user goes to another page(route).
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setCount(data.length);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsLoading(false);
          setError(error.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);
  return { data, isLoading, error,count };
};
export default useFetch;
