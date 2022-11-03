import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  const fetchData = ({ url, method, body = null, headers = null }) => {
    setloading(true);
    axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

//  useEffect(() => {
//    fetchData();
//  }, [method, url, body, headers]);

  return { fetchData, response, error, loading };
};

export default useAxios;
