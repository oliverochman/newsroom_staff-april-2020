import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import UpdateArticle from "./UpdateArticle";
import createHeaders from "../modules/headers";
import fetchSingleArticle from "../modules/fetchArticle";

const PublishArticle = (props) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    fetchSingleArticle(dispatch, setMessage, props.match.params.id);
  }, []);

  const onSubmitHandler = async (e) => {
    try {
      const response = await axios.put(
        `/admin/articles/${props.match.params.id}`,

        {
          activity: "PUBLISH",
          premium: e.target.premium.value,
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
        <UpdateArticle
          onSubmitHandler={onSubmitHandler}
          message={message}
        />
      </div>
    </>
  );
};

export default connect()(PublishArticle);