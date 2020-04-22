import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";

import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import Constants from "../../Common/Constants";
import { LOG_IN } from "./AuthQueries";

export default () => {
  const [action, setAction] = useState(Constants.LOGIN);
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });
  // console.log(username, firstName, lastName, email);
  const onLogin = (e) => {
    e.preventDefault();
    if (email.value !== "") {
      console.log("requestSecret");
      requestSecret();
    }
  };
  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onLogin={onLogin}
    />
  );
};
