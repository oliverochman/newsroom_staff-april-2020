import React, { useEffect } from 'react'
import { Container, Grid, Placeholder } from 'semantic-ui-react'
import axios from 'axios'

const Preview = ({ selectedArticle }) => {
  return (
    <div id="review">
      <Container align="center" style={{ paddingTop: "45px", width: "55%" }}>
      <Grid stretched>
        <Grid.Row centered>
          <Placeholder
            style={{ height: 250, width: 900 }}
            id={"title"}
          >
            <Placeholder.Image />
            <h5 style={{ textAlign: "center" }}>{selectedArticle.title}</h5>
          </Placeholder>
        </Grid.Row>
        <Grid.Row centered>
          <p
            id={"article-" + selectedArticle.id + "-date"}
            style={{ textAlign: "left" }}
          >
            Created at: {selectedArticle.created_at}
          </p>
        </Grid.Row>
        <Grid.Row centered>
          <p
            id={"body"}
            style={{ textAlign: "left" }}
            className="article-body"
          >
            {selectedArticle.body}
          </p>
        </Grid.Row>
      </Grid>
    </Container>
    </div>
  )
}

export default Preview
