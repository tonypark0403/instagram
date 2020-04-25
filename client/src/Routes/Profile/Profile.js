import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import { GET_USER } from "./ProfileQueries";

const Wrapper = styled.div`
  min-height: 60vh;
`;

const Header = styled.header``;

const HeaderColumn = styled.div``;

export default ({
  match: {
    params: { username },
  },
}) => {
  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else {
    // console.log(data);
    const {
      seeUser: {
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;
    return (
      <>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
        </Header>
      </>
    );
  }
};
