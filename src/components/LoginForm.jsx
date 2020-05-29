import React, { useState } from "react";
import { Form, Button, Input, Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import auth from "../modules/auth";

const LoginForm = (props) => {
  const [loginMessage, setLoginMessage] = useState("");
  const authenticatedAs = useSelector((state) => state.authenticatedAs);
  const redirect = authenticatedAs && <Redirect to={{ pathname: "/write" }} />;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.signIn(
        e.target.email.value,
        e.target.password.value
      );
      if (
        response.data.role == "journalist" ||
        response.data.role == "editor"
      ) {
        props.dispatch({
          type: "LOG_IN",
          payload: {
            authenticatedAs: response.data.role,
            uid: response.data.uid,
          },
        });
      } else {
        setLoginMessage("Invalid login credentials");
      }
    } catch (error) {
      setLoginMessage(error.response.data.errors[0]);
    }
  };

  return (
    <>
      {redirect}
      <Grid className="login-container" verticalAlign="middle">
        <Grid.Column align="center">
          <Form onSubmit={(e) => submitHandler(e)} id="login-form">
            <h1>Log in</h1>
            <h4>Email</h4>
            <Input name="email" type="email" id="email"></Input>
            <h4>Password</h4>
            <Input name="password" type="password" id="password"></Input>
            <Button id="submit">Submit</Button>
            <p id="error-message">{loginMessage}</p>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default connect()(LoginForm);
