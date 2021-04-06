import React, { useEffect, useState } from "react";

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9000/users?username=${name}`);

            const parseResponse = await response.json();

            setUsers(parseResponse);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getUsers = async () => {
        try {
            const res = await fetch("http://localhost:9000/allusers", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseData = await res.json();

            setAllUsers(parseData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);


    function goBack() {
        window.history.back();
    }

    return (
        <div>
            <div className="d-flex mt-5 justify-content-around">
                <h1>All Users</h1>
            </div>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter user ..."
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button className="btn btn-success">Submit</button>
            </form>


            <table id="allUser" className="table mt-5">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>

                    {users.length === 0 ?
                        allUsers.map(todo => (
                            <tr key={todo.todo_id}>
                                <td>{todo.user_name}</td>
                                <td>{todo.user_email}</td>

                            </tr>
                        ))
                        :
                        users.map(user => (
                            <tr key={user.user_id}>
                                <td>{user.user_name}</td>
                                <td>{user.user_email}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {/* {users.length === 0 && <p>No Results Found</p>} */}

            <button onClick={goBack}>
                Go back
             </button>
        </div>
    )
}

export default AllUsers
