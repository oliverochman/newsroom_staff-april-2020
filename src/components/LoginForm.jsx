import React, { useState } from "react";
import { Form, Button, Input, Grid } from "semantic-ui-react";
import auth from "../modules/auth";
import { Redirect } from "react-router-dom";

const LoginForm = (props) => {
  const [message, setMessage] = useState("");

  const logIn = async (e) => {
    try {
      const response = await auth.signIn(
        e.target.email.value,
        e.target.password.value
      );
      props.setUid(response.data.uid);
      props.setAuthenticated(true);
    } catch (error) {
      setMessage(error.response.data.errors[0]);
    }
  };

  const redirect = props.authenticated && (
    <Redirect to={{ pathname: "/write" }} />
  );

  return (
    <>
      {redirect}
      <Grid className="login-container" verticalAlign="middle">
        <Grid.Column align="center">
          <Form onSubmit={logIn} id="login-form">
            <h1>Log in</h1>
            <h4>Email</h4>
            <Input name="email" type="email" id="email"></Input>
            <h4>Password</h4>
            <Input name="password" type="password" id="password"></Input>
            <Button id="submit">Submit</Button>
            <p id="error-message">{message}</p>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};
export default LoginForm;
