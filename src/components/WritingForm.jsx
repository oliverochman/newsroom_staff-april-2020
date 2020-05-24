
import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import axios from "axios";

const WritingForm = () => {
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
    <Form onSubmit={onSubmitHandler}>
        <Form.Field>
          <label>Article title</label>
          <Input id="title" name="title" placeholder="Put your title here"/>
        </Form.Field>
        <Form.Field>
          <label>Article body</label>
          <textarea id="body" name="body" placeholder="Write your article here"/>
        </Form.Field>
        <Button id="post" type="submit">
          Post Article
        </Button>
        <p id="message">{message}</p>
    </Form>
  )
}

export default WritingForm;
