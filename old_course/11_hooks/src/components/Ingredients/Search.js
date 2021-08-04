import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";
import useHttp from "../../hooks/http";
import ErrorModal from "../UI/ErrorModal";

const Search = React.memo((props) => {
  const [searchText, setSearchText] = useState("");
  const { filterIngredients } = props;
  const searchTextRef = useRef();
  const {
    loading,
    error,
    sendRequest,
    data,
    // identifier,
    // id,
    clearState,
  } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText === searchTextRef.current.value) {
        const query =
          searchText.length === 0
            ? ""
            : '?orderBy="title"&equalTo="' + searchText + '"';
        sendRequest(
          "https://react-hooks-project-12c23-default-rtdb.firebaseio.com/ingredients.json" +
            query,
          "GET"
        );
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, filterIngredients, searchTextRef, sendRequest]);

  useEffect(() => {
    if (data) {
      const fetchedIngredients = Object.keys(data).map((key) => ({
        id: key,
        title: data[key].title,
        amount: data[key].amount,
      }));
      filterIngredients(fetchedIngredients);
    }
  }, [data, filterIngredients]);

  console.log({ data });

  return (
    <section className="search">
      {error && <ErrorModal onClose={clearState}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {loading && <span>Loaging...</span>}
          <input
            ref={searchTextRef}
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
