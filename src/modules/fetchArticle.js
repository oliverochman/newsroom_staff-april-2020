import axios from "axios";
import createHeaders from "../modules/headers";

const fetchWrapper = (setSelectedArticle, setPreviewMessage, id) => {
  let fetchSelectedArticle = async (id) => {
    try {
      const response = await axios.get(`/admin/articles/${id}`, {
        headers: createHeaders(),
      });
      setSelectedArticle(response.data.article);
    } catch (error) {
      setPreviewMessage(error.response.data.message);
    }
  };
  fetchSelectedArticle(id);
};

export default fetchWrapper;
