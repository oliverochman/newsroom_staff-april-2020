import React, { useEffect, useState } from "react";
import { List, Container, Divider, Grid } from "semantic-ui-react";
import axios from "axios";
import "../css/Review.css";

const Review = () => {
  const [unpublishedArticleList, setUnpublishedArticleList] = useState([]);
  useEffect(() => {
    const fetchUnpublishedArticleList = async () => {
      try {
        const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
        const response = await axios.get(
          "/admin/articles",
          {},
          {
            headers: headers,
          }
        );
        setUnpublishedArticleList(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnpublishedArticleList();
  }, []);

  const unpublishedArticlesRender =
    unpublishedArticleList.length == 0 ? (
      <p id="no-articles">There isn't any unpublished articles</p>
    ) : (
      <List divided relaxed>
        {unpublishedArticleList.map((article) => {
          return (
            <List.Item key={article.id} id={`article-${article.id}`}>
              <List.Icon
                name="exclamation"
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                <List.Header as="h3">{article.title}</List.Header>
                <List.Description class="description">
                  Created at: {article.created_at}, Category: {article.category}
                </List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );

  return (
    <div id="review-page">
      <Grid columns={2}>
        <Grid.Column id="left">
          <Container>{unpublishedArticlesRender}</Container>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </div>
  );
};

export default Review;
