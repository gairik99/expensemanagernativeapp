import { useState, useEffect } from "react";

const useFetch = (fetchFn, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return; // Prevent fetch if token not ready

    const fetchData = async () => {
      try {
        const response = await fetchFn(token);
        setData(response);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFn, token]);

  return { data, loading, error };
};

export default useFetch;
