import React, { useState } from 'react'
import axios from "axios";
import WritingForm from './WritingForm'
import { Container, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const CreateArticle = () => {
  const [message, setMessage] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      const headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
      const response = await axios.post(
        "/articles",
        { title: e.target.title.value, body: e.target.body.value },
        { headers: headers }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Container className="writing-container">
        <WritingForm onSubmitHandler={onSubmitHandler} message={message} />
      </Container>
      <Link to="/subscription">
        <button>Buy Subscription</button>
      </Link>
    </>
  );
};

export default CreateArticle;
