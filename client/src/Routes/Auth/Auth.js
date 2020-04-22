import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";

import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import Constants from "../../Common/Constants";
import { LOG_IN } from "./AuthQueries";

export default () => {
  const [action, setAction] = useState(Constants.LOGIN);
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("test@test.com"); // for test
  const [requestSecret] = useMutation(LOG_IN, {
    // update: (_, result) => console.log(result),
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        // toast.error("Please sign up first...");
        // setTimeout(() => setAction(Constants.SIGNUP), 3000);
        toast.error("Please sign up first...", {
          onClose: () => setAction(Constants.SIGNUP),
          autoClose: 3000,
        });
      }
    },
    variables: { email: email.value },
  });
  // console.log(username, firstName, lastName, email);
  const onLogin = (e) => {
    e.preventDefault();
    if (email.value !== "") {
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
