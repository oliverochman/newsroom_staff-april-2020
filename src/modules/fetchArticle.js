import axios from "axios";

const fetchWrapper = (setSelectedArticle, setPreviewMessage, id) => {
  let fetchSelectedArticle = async (id) => {
    try {
      let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      headers = {
        ...headers,
        "Content-type": "application/json",
        Accept: "application/json",
      };
      const response = await axios.get(`/admin/articles/${id}`, {
        headers: headers,
      });
      setSelectedArticle(response.data.article);
    } catch (error) {
      setPreviewMessage(error.response.data.message);
    }
  };
  fetchSelectedArticle(id);
};

export default fetchWrapper;
