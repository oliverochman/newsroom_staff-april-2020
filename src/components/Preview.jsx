import React from "react";
import { Container, Grid, Placeholder } from "semantic-ui-react";
import "../css/Preview.css";

const Preview = ({ selectedArticle }) => {
  return (
      <Container id="preview" align="center" style={{ width: "99%" }}>
        <Grid style={{ maxWidth: "99%" }}>
            <Grid.Row centered>
            <Placeholder id={"image"} style={{ maxWidth: "unset", maxHeight: "unset", height: "250px", width: "80%"}}>
              <Placeholder.Image />
              <h2 id={"title"} style={{ left: "15%", width: "70%", textAlign: "left", position: "absolute", bottom: "21px", textShadow: "2px 2px 3px black" }}>
                {selectedArticle.title}
              </h2>
            </Placeholder>
          </Grid.Row>
          <Grid.Row centered style={{ maxWidth: "unset", maxHeight: "2rem", width: "500px"}}>
            <span
              id={"article-" + selectedArticle.id + "-date"}
              style={{ textAlign: "left" }}
            >
              Created at: {selectedArticle.created_at}
            </span>
          </Grid.Row>
          <Grid.Row centered style={{ maxWidth: "unset", maxHeight: "unset" }}>
            <p
              id={"body"}
              style={{ textAlign: "left", width: "80%" }}
              className="article-body"
            >
              {selectedArticle.body}
            </p>
          </Grid.Row>       
        </Grid>
      </Container>
  );
};

export default Preview;
