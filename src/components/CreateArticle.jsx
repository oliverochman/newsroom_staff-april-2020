import React, { useState } from "react";
import { Form, Button, Input, Container } from "semantic-ui-react";
import axios from "axios";

const CreateArticle = () => {
  const [message, setMessage] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      const response = await axios.post("/articles", {
        params: { title: e.target.title.value, body: e.target.body.value },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Container className="writing-container">
      <Form onSubmit={onSubmitHandler}>
        <Form.Field>
          <label>Article title</label>
          <Input id="title" name="title" placeholder="Put your title here" required />
        </Form.Field>
        <Form.Field>
          <label>Article content</label>
          <textarea id="body" name="body" placeholder="Write your article here" required />
        </Form.Field>
        <Button id="post" type="submit">
          Post Article
        </Button>
        <p id="message">{message}</p>
      </Form>
    </Container>
  );
};

export default CreateArticle;
