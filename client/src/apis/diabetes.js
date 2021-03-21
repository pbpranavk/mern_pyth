import axios from "axios";

const postPredict = async (test) => {
  const { data } = await axios.post("http://localhost:8080/diabetes", {
    values: test,
  });
  return data;
};

export { postPredict };
