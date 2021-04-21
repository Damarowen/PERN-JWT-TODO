import React, { useEffect, useState } from "react";

//components

 import ListTodos from "./todolist/ListTodos";

const OtherDashboard = ({userId}) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  
  const pathname = window.location.pathname; //user/:username
  const username = pathname.split('/')[2]; //:username
 

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch(`http://localhost:9000/user/${username}`, {
          method: "GET"
        });
  
        const parseData = await res.json();
         setAllTodos(parseData.rows);
         setName(parseData.rows[0].user_name);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    getProfile();
  }, [username]);


  function goBack() {
    window.history.back();
}


  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name} 's Todo List</h2>
   
      </div>

      <ListTodos allTodos={allTodos} userId={userId} />

      <button onClick={goBack}>
                Go back
             </button>
    </div>
  );
};

export default OtherDashboard;
