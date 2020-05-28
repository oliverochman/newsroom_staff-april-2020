import React from "react";
import { Form, Button, Input, Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { connect, useSelector } from 'react-redux'

const LoginForm = (props) => {

  const submitHandler = async e => {
    await props.dispatch({ type: "LOG_IN", payload: { email: e.target.email.value, password: e.target.password.value}})
    debugger;
    console.log(e)
  }

  const redirect = useSelector(state => state.authenticatedAs) && (
    <Redirect to={{ pathname: "/write" }} />
  );

  return (
    <>
      {redirect}
      <Grid className="login-container" verticalAlign="middle">
        <Grid.Column align="center">
          <Form onSubmit={ (e) => submitHandler(e) } id="login-form">
            <h1>Log in</h1>
            <h4>Email</h4>
            <Input name="email" type="email" id="email"></Input>
            <h4>Password</h4>
            <Input name="password" type="password" id="password"></Input>
            <Button id="submit">Submit</Button>
            <p id="error-message">{ useSelector(state => state.loginMessage) }</p>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};
export default connect()(LoginForm);
