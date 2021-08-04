import { useReducer, useCallback } from "react";

const initialState = {
  data: null,
  loading: false,
  error: null,
  identifier: null,
  id: null,
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "INIT":
      return initialState;
    case "INPROGRESS":
      return {
        ...initialState,
        loading: true,
      };
    case "SUCCESS":
      console.log(action.payload);
      return {
        ...httpState,
        loading: false,
        data: action.payload.data,
        identifier: action.payload.identifier,
        id: action.payload.id,
      };
    case "FAILED":
      return { ...httpState, loading: false, error: action.payload.error };
    default:
      return httpState;
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    data: null,
    identifier: null,
    id: null,
  });

  const clearState = useCallback(() => {
    dispatchHttp({ type: "INIT" });
  }, []);

  const sendRequest = useCallback(
    (url, method, headers, data = {}, identifier, id) => {
      dispatchHttp({ type: "INPROGRESS" });
      let config = null;
      if (method === "GET") {
        config = null;
        data = null;
      } else {
        config = {
          method,
          headers,
          body: JSON.stringify(data),
        };
      }
      fetch(url, config)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((resData) => {
          console.log({
            payload: {
              data: data ? data : resData,
              identifier,
              id: id ? id : resData.name,
            },
          });
          dispatchHttp({
            type: "SUCCESS",
            payload: {
              data: data ? data : resData,
              identifier,
              id: id ? id : resData.name,
            },
          });
        })
        .catch((error) => {
          console.log(error);
          dispatchHttp({ type: "FAILED", payload: { error: error.message } });
        });
    },
    []
  );

  return {
    loading: httpState.loading,
    error: httpState.error,
    data: httpState.data,
    identifier: httpState.identifier,
    sendRequest,
    id: httpState.id,
    clearState,
  };
};

export default useHttp;
