import React from "react";
import styled from "styled-components";
import Constants from "../../Common/Constants";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import ReactHelmet from "../../Components/ReactHelmet";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  setAction,
  action,
  username,
  firstName,
  lastName,
  email,
  secret,
  onSubmit,
}) => {
  return (
    <Wrapper>
      <Form>
        {action === Constants.LOGIN && (
          <>
            <ReactHelmet title={"Log In | Prismagram"} />
            <form onSubmit={onSubmit}>
              <Input placeholder={"Email"} {...email} type="email" />
              <Button text={"Log in"} />
            </form>
          </>
        )}
        {action === Constants.SIGNUP && (
          <>
            <ReactHelmet title={"Sign Up | Prismagram"} />
            <form onSubmit={onSubmit}>
              <Input placeholder={"First name"} {...firstName} />
              <Input placeholder={"Last name"} {...lastName} />
              <Input placeholder={"Email"} {...email} type="email" />
              <Input placeholder={"Username"} {...username} />
              <Button text={"Sign up"} />
            </form>
          </>
        )}
        {action === Constants.CONFIRM && (
          <>
            <ReactHelmet title={"Confirm Secret | Prismagram"} />
            <form onSubmit={onSubmit}>
              <Input placeholder="Paste your secret" required {...secret} />
              <Button text={"Confirm"} />
            </form>
          </>
        )}
      </Form>
      {action !== Constants.CONFIRM && (
        <StateChanger>
          {action === Constants.LOGIN ? (
            <>
              Don't have an account?{" "}
              <Link onClick={() => setAction(Constants.SIGNUP)}>Sign up</Link>
            </>
          ) : (
            <>
              Have an account?{" "}
              <Link onClick={() => setAction(Constants.LOGIN)}>Log in</Link>
            </>
          )}
        </StateChanger>
      )}
    </Wrapper>
  );
};
