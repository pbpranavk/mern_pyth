import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";

const getTodos = async () => {
  const { data } = await axios.get("/todo");
  return data;
};

const postTodos = async (todo) => {
  const { data } = await axios.post("/todo", { ...todo });
  return data;
};

const deleteTodos = async () => {
  const { data } = await axios.delete("/todo");
  return data;
};

const getTodoById = async ({ id }) => {
  const { data } = await axios.get(`/todo/${id}`);
  return data;
};

const putTodoById = async ({ todo, id }) => {
  const { data } = await axios.put(`/todo/${id}`, { ...todo });
  return data;
};

const deleteTodoById = async ({ id }) => {
  const { data } = await axios.delete(`/todo/${id}`);
  return data;
};

export {
  getTodos,
  postTodos,
  deleteTodos,
  getTodoById,
  putTodoById,
  deleteTodoById,
};
