import React from "react";
import { Form, Button, Input, Image } from "semantic-ui-react";

const WritingForm = (props) => {
  return (
    <>
      <Form onSubmit={props.onSubmitHandler}>
        <Form.Field>
          <label>Article title</label>
          <Input id="title" name="title" placeholder="Put your title here" />
        </Form.Field>
        <Form.Field>
          <label>Article Image</label>
          <Input
            id="image-upload"
            name="image"
            type="file"
            onChange={props.handleUploadChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Article body</label>
          <textarea
            id="body"
            name="body"
            placeholder="Write your article here"
          />
        </Form.Field>
        <Button id="post" type="submit">
          Post Article
        </Button>
        <p id="message">{props.message}</p>
      </Form>
    </>
  );
};

export default WritingForm;
