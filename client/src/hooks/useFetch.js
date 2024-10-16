import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => { 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hostUrl =
          url.startsWith("http://") || url.startsWith("https://")
            ? url
            : `http://localhost:5000${url}`;

        const response = await fetch(hostUrl, {
          method: 'GET', 
          ...options, 
        });

        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]); 

  return { data, loading, error };
};

export default useFetch;

/* Sample Inputs to Call useFetch:

1. Basic GET request:
const { data, loading, error } = useFetch('/api/data');
// This will call http://localhost:5000/api/data

2. GET request with full URL:
const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');
// This will call the full URL directly

3. POST request with Bearer token and custom headers:
const { data, loading, error } = useFetch('/api/protected-data', {
  headers: {
    'method':'POST',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
// This will call http://localhost/api/protected-data with Bearer token for authentication

4. GET request to another path with custom headers:
const { data, loading, error } = useFetch('/api/users', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  }
});
// This will call http://localhost:5000/api/users with additional headers
*/
