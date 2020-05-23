import React from "react";
import { Grid } from "semantic-ui-react";

const Header = () => {
  return (
    <Grid className="header" padded>
      <Grid.Column width={5}>
        <h1 id="header">Daily News Sense</h1>
      </Grid.Column>
    </Grid>
  );
};
export default Header;
