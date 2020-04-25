import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";

import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import Constants from "../../Shared/Constants";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";

export default () => {
  const [action, setAction] = useState(Constants.LOGIN);
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    // update: (_, { data }) => {
    //   const { requestSecret } = data;
    //   if (!requestSecret) {
    //     toast.info("Created account successfully...");
    //   }
    // },
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  // console.log(username, firstName, lastName, email);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === Constants.LOGIN) {
      if (email.value !== "") {
        try {
          // requestSecret();
          const {
            data: { requestSecret },
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("Please sign up first...", {
              onClose: () => setAction(Constants.SIGNUP),
              autoClose: 3000,
            });
          } else {
            toast.success("Check your inbox for your login secret!");
            setAction(Constants.CONFIRM);
          }
        } catch (err) {
          toast.error(err.message);
        }
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
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Can't create account!");
          } else {
            toast.success("Account created! Log In now", {
              onClose: () => setAction(Constants.LOGIN),
              autoClose: 3000,
            });
          }
        } catch (err) {
          toast.error(err.message);
        }
      } else {
        toast.error("All fields are requred");
      }
    } else if (action === Constants.CONFIRM) {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();
          // console.log(token);
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("Can't confirm secret!");
        }
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
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
