import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ allTodos, userId }) => {

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

  let find = todos.map(item => item.user_id.includes(userId))
  let datafilter = find.includes(true)
  let keys = Math.floor(Math.random() * 9)

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          { datafilter ? [
             <tr key={keys}> 
             <th>Description</th>
             <th>Edit</th>
             <th>Delete</th>    
          </tr>
          ] : [
            <tr key={keys}> 
            <th>Description</th>
         </tr>
         ]}
       
        </thead>
        <tbody>
          {todos.length !== 0 && todos[0].todo_id !== null &&  //* this function to check first row not null, then display data
            todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                {todo.user_id === userId ?
                <td> <EditTodo todo={todo}/> </td>
                 : null }
                   {todo.user_id === userId ?
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>         
                </td> : null }
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
