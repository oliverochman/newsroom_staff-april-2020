import React from "react";
import { Grid, Button } from "semantic-ui-react";

const Header = (props) => {

  return (
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
            <Button basic inverted>Log out {props.uid}</Button>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default Header;
