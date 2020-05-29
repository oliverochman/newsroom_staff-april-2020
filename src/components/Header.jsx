import React, { useEffect } from "react";
import { Menu, Container } from "semantic-ui-react";
import auth from "../modules/auth";
import { Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const Header = (props) => {
  const logOut = async () => {
    try {
      await auth.signOut();
      props.setAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  const uid = useSelector((state) => state.uid);
  const redirect = useSelector((state) => state.authenticatedAs) && (
    <Redirect to={{ pathname: "/" }} />
  );

  return (
    <Container className="header">
      {redirect}
      <Menu className="header" stackable>
        <Menu.Item>
          <h1>Daily News Sense</h1>
        </Menu.Item>
        {useSelector((state) => state.authenticatedAs) && (
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
const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Header);
