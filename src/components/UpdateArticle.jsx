import React from "react";
import categoryList from "../modules/category";
import { Container, Grid, Form, Dropdown, Button } from "semantic-ui-react";
import Preview from "./Preview";

const UpdateArticle = (props) => {
  const categories = categoryList();
  return (
    <Grid columns={2}>
      <Grid.Column id="left">
        <Container>
          <Preview selectedArticle={props.selectedArticle} />
        </Container>
      </Grid.Column>
      <Grid.Column>
        <Form onSubmit={props.onSubmitHandler}>
          <Form.Field>
            <label>Category</label>
            <Dropdown
              selection
              id="category"
              name="category"
              placeholder={props.selectedArticle.category}
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
              checked={props.radio === "free"}
              onChange={(e) => {
                props.setRadio(e.target.value);
              }}
            />
            <label style={{ display: "inline" }}> Free </label>
            <input
              id="radio-premium"
              label="Premium"
              name="radioGroup"
              value="premium"
              checked={props.radio === "premium"}
              type="radio"
              onChange={(e) => {
                props.setRadio(e.target.value);
              }}
            />
            <label style={{ display: "inline" }}> Premium</label>
          </Form.Field>
          <Button id="publish-btn" type="submit">
            Publish Article
          </Button>
          <p id="message">{props.message}</p>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default UpdateArticle;
