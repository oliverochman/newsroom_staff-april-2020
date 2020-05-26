import React, { useState }  from 'react'
import axios from "axios";
import WritingForm from './WritingForm'
import { Container } from 'semantic-ui-react'

const CreateArticle = () => {
  const [message, setMessage] = useState("");

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    debugger;

    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

  const onSubmitHandler = async (e) => {
    try {
      const image = e.target.image
      let encodedImage

      let articleParams = {
        title: e.target.title.value, 
        body: e.target.body.value
      }


      if (image.files[0]) {
        encodedImage = await toBase64(image.files[0])

        articleParams.image = encodedImage
      }

      const response = await axios.post("/articles", articleParams);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Container className="writing-container">
      <WritingForm onSubmitHandler={onSubmitHandler} message={message}/>
    </Container>
  );
};

export default CreateArticle;
