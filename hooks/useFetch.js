import { useState, useEffect } from "react";
// Adjust the import path as necessary

const useFetch = (fetchFn, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFn(token);
        setData(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFn]);

  return { schedules, loading, error };
};

export default useFetch;
