import { useCallback, useState } from "react";

export const useFetch = (action) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (inputData) => {
    setLoading(true);
    setError(null);
    let data = [];
    try {
      const response = await fetch(
        "https://custom-hooks-31b4f-default-rtdb.firebaseio.com/tasks.json",
        {
          method: action,
          body: JSON.stringify(inputData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      data = await response.json();
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setLoading(false);
    return data;
  }, [action]);

  return [request, loading, error];
};
