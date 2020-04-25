import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQuery";

const Post = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location,
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput(""); // {value, onChange, setValue}
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });
  const [addCommentMutation, { loading: loadingComment }] = useMutation(
    ADD_COMMENT,
    {
      variables: { postId: id, text: comment.value },
    }
  );

  useEffect(() => {
    let timer;
    const slide = () => {
      const totalFiles = files.length;
      if (currentItem === totalFiles - 1) {
        timer = setTimeout(() => setCurrentItem(0), 3000);
      } else {
        timer = setTimeout(() => setCurrentItem(currentItem + 1), 3000);
      }
    };
    slide();
    return () => {
      clearTimeout(timer);
    };
  }, [currentItem, files.length]);

  const toggleLike = () => {
    console.log("isLiked : ", isLikedS);
    toggleLikeMutation();
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };

  const onKey = async (e) => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
      try {
        if (!loadingComment && comment.value) {
          const {
            data: { addComment },
          } = await addCommentMutation();
          console.log("comment:", addComment);
          setSelfComments([...selfComments, addComment]);
          comment.setValue("");
        } else {
          // Spinner or Loading
        }
      } catch {
        toast.error("Can't send comment");
      }
    }
  };

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKey={onKey}
      selfComments={selfComments}
    />
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default Post;
