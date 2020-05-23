import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";
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
    <div>
      <Form onSubmit={onSubmitHandler}>
        <Form.Field>
          <label>Title</label>
          <Input id="title" name="title" placeholder="Title" required />
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <textarea id="body" name="body" placeholder="Content" required />
        </Form.Field>
        <Button id="post" type="submit">
          Post
        </Button>
        <p id="message">{message}</p>
      </Form>
    </div>
  );
};

export default CreateArticle;
