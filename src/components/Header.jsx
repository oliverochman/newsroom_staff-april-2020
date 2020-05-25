import React from "react";
import { Grid, Button } from "semantic-ui-react";
import auth from '../modules/auth'
import { Redirect } from 'react-router-dom'

const Header = (props) => {
  const logOut = async () => {
    try {
      await auth.signOut()
      props.setAuthenticated(false)
    } catch(error) {
      console.log(error)
    }
  }

  const redirect = !props.authenticated && <Redirect to={{pathname: '/'}}/>

  return (
    <>
      {redirect}
      <Grid className="header" padded>
        <Grid.Column width={5}>
          <h1 id="header">Daily News Sense</h1>
        </Grid.Column>
        <Grid.Row celled columns='equal'>
          <Grid.Column>
            Write
          </Grid.Column>
          <Grid.Column width={4}>
            {props.authenticated && (
              <Button basic inverted onClick={() => logOut()}>Log out {props.uid}</Button>
              )}
          </Grid.Column>
        </Grid.Row>
    </Grid>
    </>
  );
};
export default Header;
