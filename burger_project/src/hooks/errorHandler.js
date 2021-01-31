import { useState, useEffect } from "react";

const useHandler = (httpClient) => {
  const [error, setError] = useState(null);
  const reqInterceptors = httpClient.interceptors.request.use(
    (req) => req,
    (err) => {
      setError(err);
      return Promise.reject(err);
    }
  );
  const resInterceptors = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptors);
      httpClient.interceptors.response.eject(resInterceptors);
    };
  }, [reqInterceptors, resInterceptors, httpClient]);

  return [error, setError];
};

export default useHandler;
