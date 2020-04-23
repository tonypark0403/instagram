import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";

import Input from "../Input";
import useInput from "../../Hooks/useInput";
import { Compass, HeartEmpty, User, Home, Email, Logo } from "../Icons";
import { ME } from "./HeaderQuery";

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    display: flex;
    justify-content: space-between;
    max-width: 200px;
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 215px;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
  @media (max-width: 500px) {
    display: none;
  }
`;

const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.5;
  }
`;

export default () => {
  const search = useInput("");
  const history = useHistory();
  const { data, loading } = useQuery(ME);
  if (loading) {
    return "";
  }
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput {...search} placeholder="Search" />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/">
            <Home />
          </HeaderLink>
          <HeaderLink to="#">
            <Email />
          </HeaderLink>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {!data.me ? (
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={data.me.username}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
};
