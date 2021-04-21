import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { toast } from "react-toastify";

//components

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard";
import OtherDashboard from "./components/dashboard/OtherDashboard";
import AllUsers from "./components/dashboard/AllUsers";
import Landing from "./components/Landing";

toast.configure();

function App() {


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId ] = useState('')


  useEffect(() => {


    const checkAuthenticated = async () => {
      try {
        const res = await fetch("http://localhost:9000/authentication/verify", {
          method: "GET",
          headers: { token: localStorage.token }
        });

        const parseRes = await res.json();
        const userId = parseRes[1]

        if (parseRes[0] === true) {
          setIsAuthenticated(true)
          setUserId(userId)
        } else {
          setIsAuthenticated(false)
          setUserId('')

        }


      } catch (err) {
        console.error(err.message);
      }
    };
    checkAuthenticated();
  }, [isAuthenticated]);


  //* create a function to change autenticated
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };



  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                !isAuthenticated ? (
                  <Landing {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                !isAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                  <Dashboard {...props} userId={userId} setAuth={setAuth} />
                )
              }
            />
            <Route
              exact
              path="/allusers"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) :
                  <AllUsers {...props} />
              }
            />
            <Route
              exact
              path='/user/:username'
              render={(props) =>
                !isAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                  <OtherDashboard {...props} userId={userId} setAuth={setAuth} />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
