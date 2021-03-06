import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  min-height: 50vh;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: minmax(auto, 292px);
  grid-auto-rows: minmax(auto, 292px);
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  if (!searchTerm) {
    return (
      <Wrapper>
        <FatText text="Search for something" />
      </Wrapper>
    );
  } else if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No Users Found" />
          ) : (
            data.searchUser.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                avatarUrl={user.avatar}
                isSelf={user.isSelf}
              />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text="No Posts Found" />
          ) : (
            data.searchPost.map((post) => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    searchPost: PropTypes.arrayOf(
      PropTypes.shape({
        files: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
          })
        ),
        likeCount: PropTypes.number.isRequired,
        commentCount: PropTypes.number.isRequired,
      })
    ),
    searchUser: PropTypes.arrayOf(
      PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string,
        isFollowing: PropTypes.bool,
        isSelf: PropTypes.bool,
      })
    ),
  }),
};

export default SearchPresenter;
