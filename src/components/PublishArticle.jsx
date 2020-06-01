import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateArticle from "./UpdateArticle";
import createHeaders from "../modules/headers";
import fetchWrapper from "../modules/fetchArticle";

const PublishArticle = (props) => {
  const [selectedArticle, setSelectedArticle] = useState();
  const [message, setMessage] = useState("");
  const [radio, setRadio] = useState("free");

  useEffect(() => {
    fetchWrapper(setSelectedArticle, setMessage, props.match.params.id);
  }, []);

  const onSubmitHandler = async () => {
    try {
      const response = await axios.put(
        `/admin/articles/${props.match.params.id}`,

        {
          activity: "PUBLISH",
          premium: radio === "premium" ? true : false,
          category: document
            .getElementById("category")
            .firstElementChild.innerText.toLowerCase(),
        },
        {
          headers: createHeaders(),
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <>
      <div id="publish-page">
        {selectedArticle && (
          <UpdateArticle
            onSubmitHandler={onSubmitHandler}
            selectedArticle={selectedArticle}
            message={message}
            setRadio={setRadio}
            radio={radio}
          />
        )}
      </div>
    </>
  );
};

export default PublishArticle;
