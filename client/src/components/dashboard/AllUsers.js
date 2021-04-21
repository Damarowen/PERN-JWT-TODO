import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [name, setName] = useState("");
    const [search, setSearch] = useState([]);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9000/users?username=${name}`);

            const parseResponse = await response.json();

            setSearch(parseResponse);
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
      
    }, [search]);


    function goBack() {
        window.history.back();
    }

    
    const dataFilter = allUsers.filter(x => x.user_name.toLowerCase().includes(name.toLowerCase()))

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

                    {
                        dataFilter.map(item => (
                            
                            <tr key={item.user_id}>
                                {/* <OtherDashboard username={item.user_name}/> */}
                               <td>  <Link to={`user/${item.user_name}`}>{item.user_name}</Link>   </td>
                                <td>{item.user_email}</td>

                            </tr>
                        ))
                        
                       }
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
