import React from "react";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

export default ({ location: { search } }) => {
  const term = search.split("=")[1]; //?term=keyword => 우린 keyword가 필요
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term,
    },
  });

  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
};
