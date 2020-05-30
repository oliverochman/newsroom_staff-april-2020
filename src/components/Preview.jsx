import React from "react";
import { Container, Grid, Placeholder } from "semantic-ui-react";
import "../css/Preview.css";

const Preview = ({ selectedArticle }) => {
  return (
    <Container id="preview" align="center">
      <Grid>
        <Grid.Row centered>
          <Placeholder id={"image"}>
            <Placeholder.Image />
            <h2 id={"preview-title"}>{selectedArticle.title}</h2>
          </Placeholder>
        </Grid.Row>
        <Grid.Row centered id="created-text">
          Created at: {selectedArticle.created_at}
        </Grid.Row>
        <Grid.Row centered id="preview-body">
          <p id={"body"} className="article-body">
            {selectedArticle.body}
          </p>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Preview;
