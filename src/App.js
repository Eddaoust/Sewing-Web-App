import React from 'react';
import {useSelector} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";

const App = () => {
    const user = useSelector(state => state.user);

  return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/registration" exact component={Registration}/>
            {(user.activated && user.auth) && <Route path="/home" exact component={Home}/>}
        </Switch>
      </BrowserRouter>
  );
};

export default App;
