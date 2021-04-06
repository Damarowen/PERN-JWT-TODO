import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ allTodos }) => {

  const [todos, setTodos] = useState([]); 

  //*delete todo function
  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:9000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token }
      });

      //* no need to use filter
      // setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);


  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length !== 0 && todos[0].todo_id !== null &&  //* this function to check first row not null, then display data
            todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo}  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
