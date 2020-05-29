import React, { useEffect } from "react";
import { Menu, Container } from "semantic-ui-react";
import auth from "../modules/auth";
import { Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const Header = (props) => {
  const logOut = async () => {
    try {
      await auth.signOut();
      props.dispatch({type: "LOGOUT" })
    } catch (error) {
      console.log(error);
    }
  };

  const authenticatedAs = useSelector((state) => state.authenticatedAs)
  const uid = useSelector((state) => state.uid);

  const redirect = !authenticatedAs && (
    <Redirect to={{ pathname: "/" }} />
  );

  return (
    <Container className="header">
      {redirect}
      <Menu className="header" stackable>
        <Menu.Item>
          <h1>Daily News Sense</h1>
        </Menu.Item>
        {authenticatedAs && (
          <>
            <Menu.Item active>Write</Menu.Item>
            <Menu.Item position="right" id="logout" onClick={() => logOut()}>
              <h4>
                Log out <br />
                {uid}
              </h4>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Container>
  );
};

export default connect()(Header);
