import React, { useEffect, useState } from "react";
import axios from "axios";
import Preview from "./Preview";
import { Container, Grid, Form, Dropdown, Button } from "semantic-ui-react";

const PublishArticle = (props) => {
  const [selectedArticle, setSelectedArticle] = useState();
  const [message, setMessage] = useState("");
  const [radio, setRadio] = useState("free");
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json",
  };

  const cats = [
    "Other",
    "Sport",
    "Local",
    "Politics",
    "Economy",
    "World",
    "Entertainment",
  ];

  const categories = cats.map((cat) => {
    return { key: cat, text: cat, value: cat.toLowerCase() };
  });

  useEffect(() => {
    const fetchSelectedArticle = async () => {
      try {
        const response = await axios.get(
          `/admin/articles/${props.match.params.id}`,
          {
            headers: headers,
          }
        );
        setSelectedArticle(response.data.article);
      } catch (error) {
        setMessage(error.response.data.message);
      }
    };
    fetchSelectedArticle();
  }, []);

  const onSubmitHandler = async () => {
    try {
      const response = await axios.put(
        `/admin/articles/${props.match.params.id}`,
        {
          headers: headers,
          params: {
            activity: "PUBLISH",
            premium: radio === "premium" ? true : false,
            category: document
              .getElementById("category")
              .firstElementChild.innerText.toLowerCase(),
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <>
      <div id="publish-page">
        {selectedArticle && (
          <Grid columns={2}>
            <Grid.Column id="left">
              <Container>
                <Preview selectedArticle={selectedArticle} />
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Form onSubmit={onSubmitHandler}>
                <Form.Field>
                  <label>Category</label>
                  <Dropdown
                    selection
                    id="category"
                    name="category"
                    placeholder={selectedArticle.category}
                    options={categories}
                  ></Dropdown>
                </Form.Field>
                <Form.Field>
                  <input
                    id="radio-free"
                    label="Free"
                    name="radioGroup"
                    value="free"
                    type="radio"
                    checked={radio === "free"}
                    onChange={(e) => {
                      setRadio(e.target.value);
                    }}
                  />
                  <label style={{ display: "inline" }}> Free </label>
                  <input
                    id="radio-premium"
                    label="Premium"
                    name="radioGroup"
                    value="premium"
                    checked={radio === "premium"}
                    type="radio"
                    onChange={(e) => {
                      setRadio(e.target.value);
                    }}
                  />
                  <label style={{ display: "inline" }}> Premium</label>
                </Form.Field>
                <Button id="publish-btn" type="submit">
                  Publish Article
                </Button>
                <p id="message">{message}</p>
              </Form>
            </Grid.Column>
          </Grid>
        )}
      </div>
    </>
  );
};

export default PublishArticle;
