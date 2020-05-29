import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import CreateArticle from "./components/CreateArticle";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import auth from "./modules/auth";

const App = (props) => {
  useEffect(() => {
    async function validate() {
      if (localStorage.hasOwnProperty("J-tockAuth-Storage")) {
        const tokenParams = JSON.parse(
          localStorage.getItem("J-tockAuth-Storage")
        );
        try {
          const response = await auth.validateToken(tokenParams);
          props.dispatch({
            type: "LOG_IN",
            payload: {
              authenticatedAs: response.data.role,
              uid: response.data.uid,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    validate();
  }, []);

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <LoginForm />
          )}
        />
        <Route
          path="/write"
          component={CreateArticle}
        />
      </Switch>
    </div>
  );
}

export default App;
