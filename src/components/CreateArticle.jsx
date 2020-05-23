import React from "react";
import { Form, Button, Input } from "semantic-ui-react";
import axios from 'axios'

const CreateArticle = () => {
  const onSubmitHandler = async (e) => {

    try {
      const response = await axios.post('/articles', {
        params: { title: e.target.title.value, body: e.target.body.value }
      })
      debugger
    } catch (error) {
      debugger
    }
  }


  return (
    <div>
      <Form onSubmit={onSubmitHandler}>
        <Form.Field>
          <label>Title</label>
          <Input id="title" name="title" placeholder="Title" />
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <textarea id="body" name="body" placeholder="Content" />
        </Form.Field>
        <Button id="post" type="submit">
          Post
        </Button>
      </Form>
    </div>
  );
};

export default CreateArticle;
