import React, { useEffect,useState } from "react";
import { List } from "semantic-ui-react";
import axios from "axios"

const Review = () => {
  const [unpArticleList, setUnpArticleList] = useState([]);
  useEffect(() => {
    const fetchUnpArticleList = async () => {
      try {
        const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
        const response = await axios.get("/admin/articles", {}, {
          headers: headers,
        });
        setUnpArticleList(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnpArticleList();
  }, []);

  const unpArticlesRender =
    unpArticleList == [] ? (
      <p id="no-articles">There isn't any unpublished articles</p>
    ) : (
      <List divided relaxed>
        {unpArticleList.map((article) => { return (
          <List.Item key={article.id} id={`article-${article.id}`}>
            <List.Icon name="exclamation" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a">{article.title}</List.Header>
              <List.Description >Created at: {article.created_at} Category: {article.category}</List.Description>
            </List.Content>
          </List.Item> )
        })}
      </List>
    );

  return <div>{unpArticlesRender}</div>;
};

export default Review;
