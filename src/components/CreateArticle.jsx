import React from 'react'
import { Form, Button, Input } from "semantic-ui-react"

const CreateArticle = () => {
  
  return (
    <div>
      <Form>
      <Form.Field>
        <label>Title</label>
          <Input id="title" placeholder='Title'/>
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <textarea id="body" placeholder='Content'/>
        </Form.Field>
          <Button id="post" type='submit'>Post</Button>
    </Form>
    </div>
  )
}

export default CreateArticle
