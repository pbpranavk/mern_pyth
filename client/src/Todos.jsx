import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";

import {
  getTodos,
  postTodos,
  deleteTodos,
  //   getTodoById,
  putTodoById,
  deleteTodoById,
} from "./apis/todos";

const Todo = ({ todo = {}, refetch }) => {
  console.log({ todo });
  const updateTodo = useMutation(putTodoById, {
    onSuccess: () => {
      // alert("Updated successfully");
      setIsEditing(false);
      refetch();
    },
    onError: () => {
      // alert("Updated un-successfully");
    },
  });

  const deleteTodo = useMutation(deleteTodoById, {
    onSuccess: () => {
      // alert("Deleted successfully");
      refetch();
    },
    onError: () => {
      // alert("Deleted un-successfully");
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo?.title || "");

  const todoTitleProp = todo?.title || "";
  useEffect(() => {
    setNewTitle(todoTitleProp);
  }, [todoTitleProp]);

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      {isEditing ? (
        <div>
          <input
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e?.target?.value);
            }}
          />
          <button
            onClick={() => {
              updateTodo.mutate({
                todo: { ...todo, title: newTitle },
                id: todo?.id,
              });
            }}
          >
            save
          </button>
          <button onClick={handleEditing}>cancel</button>
        </div>
      ) : (
        <div>
          <p>{todo?.title || ""}</p>
          <button onClick={handleEditing}>edit</button>
          <button
            onClick={() => {
              deleteTodo.mutate({ id: todo?.id });
            }}
          >
            delete
          </button>
        </div>
      )}
    </>
  );
};

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    status: todosStatus,
    isLoading: isTodosLoading,
    isFetching: isTodosFetching,
    refetch,
  } = useQuery("getTodos", getTodos);

  const createTodo = useMutation(postTodos, {
    onSuccess: () => {
      refetch();
      setNewTodo("");
      // alert("Creation successfully");
    },
    onError: () => {
      // alert("Creation un-successfully");
    },
  });

  const deleteAllTodos = useMutation(deleteTodos, {
    onSuccess: () => {
      refetch();
      // alert("Deleted all successfully");
    },
    onError: () => {
      // alert("Deleted all un-successfully");
    },
  });

  const loader = todosStatus === "loading" || isTodosLoading || isTodosFetching;

  console.log({ todos });

  if (loader) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <div>
        <button
          onClick={() => {
            deleteAllTodos.mutate();
          }}
        >
          Delete All
        </button>
      </div>
      {todos?.map((todo) => (
        <Todo todo={todo} refetch={refetch} />
      ))}

      <div>
        <input
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e?.target?.value);
          }}
        />
        <button
          onClick={() => {
            createTodo.mutate({ title: newTodo });
          }}
        >
          Create New Todo
        </button>
        <button
          onClick={() => {
            setNewTodo("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

Todos.propTypes = {};

export default Todos;
