import React, { useEffect } from "react";
import axios from "axios";

const PublishArticle = (props) => {
  useEffect(() => {
    debugger;
    const fetchSelectedArticle = async () => {
      try {
        let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
        headers = {
          ...headers,
          "Content-type": "application/json",
          Accept: "application/json",
        };
        const response = await axios.get(`/admin/articles/`, {
          headers: headers,
        });
        // setSelectedArticle(response.data.article);
      } catch (error) {
        // setPreviewMessage(error.response.data.message);
      }
    };
    fetchSelectedArticle();
  }, []);

  return <div></div>;
};

export default PublishArticle;
