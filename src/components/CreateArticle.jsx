import React, { useState } from "react";
import axios from "axios";
import WritingForm from "./WritingForm";
import { Container } from "semantic-ui-react";

const CreateArticle = () => {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmitHandler = async (e) => {
    try {
      e.persist();
      const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      let encodedImage;
      if (e.target.image.files[0]) {
        encodedImage = await toBase64(e.target.image.files[0]);
      }
      const response = await axios.post(
        "/articles",
        {
          title: e.target.title.value,
          body: e.target.body.value,
          image: encodedImage,
        },
        { headers: headers }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Container className="writing-container">
      <WritingForm
        onSubmitHandler={onSubmitHandler}
        handleChange={handleChange}
        message={message}
        imagePreview={imagePreview}
      />
    </Container>
  );
};

export default CreateArticle;
