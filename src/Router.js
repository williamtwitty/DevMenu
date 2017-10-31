import React from "react";
import { Switch, Route} from "react-router-dom";

import HomePage from './components/HomePage';
import Menu from './components/Menu';
import AdminPage from './components/AdminPage';

export default (
   <Switch>
       <Route exact path='/' component={ HomePage }/>
       <Route path='/menu' component={ Menu} />
       <Route path='/admin' component={ AdminPage } />
   </Switch>
)