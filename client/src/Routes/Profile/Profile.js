import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_USER } from "./ProfileQueries";
import ProfilePresenter from "./ProfilePresenter";

export default ({
  match: {
    params: { username },
  },
}) => {
  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  return <ProfilePresenter loading={loading} data={data} />;
};
