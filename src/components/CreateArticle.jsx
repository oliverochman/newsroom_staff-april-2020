import React from 'react'
import { Form, Button } from "semantic-ui-react"

const CreateArticle = () => {
  
  return (
    <div>
      <Form>
      <Form.Field>
        <label>Title</label>
          <input placeholder='Title'/>
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <input placeholder='Content'/>
        </Form.Field>
          <Button type='submit'>Submit</Button>
    </Form>
    </div>
  )
}

export default CreateArticle
