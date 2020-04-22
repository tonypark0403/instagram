import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";

import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import Constants from "../../Common/Constants";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";

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
        toast.error("Please sign up first...", {
          onClose: () => setAction(Constants.SIGNUP),
          autoClose: 3000,
        });
      }
    },
    variables: { email: email.value },
  });

  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.info("Created account successfully...");
      }
    },
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });
  // console.log(username, firstName, lastName, email);
  const onSubmit = (e) => {
    e.preventDefault();
    if (action === Constants.LOGIN) {
      if (email.value !== "") {
        requestSecret();
      } else {
        toast.error("Email is required");
      }
    } else if (action === Constants.SIGNUP) {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        createAccount();
      } else {
        toast.error("All fields are requred");
      }
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
      onSubmit={onSubmit}
    />
  );
};
