import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";

import Loader from "../../Components/Loader";
import { FEED_QUERY } from "./FeedQueries";
import Post from "../../Components/Post/Post";
import ReactHelmet from "../../Components/ReactHelmet";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  // console.log(data, loading);
  if (!loading) {
    console.log(data.seeFeed);
  }
  return (
    <Wrapper>
      <ReactHelmet title={"Feed | Prismagram"} />
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            location={post.location}
            caption={post.caption}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  );
};
