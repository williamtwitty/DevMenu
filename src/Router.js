import React from "react";
import { Switch, Route} from "react-router-dom";

import HomePage from './components/HomePage';
import Menu from './components/Menu';
import AdminPage from './components/AdminPage';
import MenuItems from './components/MenuItems';

export default (
    <Switch>
        <Route exact path='/' component={ HomePage }/>
        <Route exact path='/menu' component={ Menu} />
        <Route exact path='/admin' component={ AdminPage } />
        <Route exact path='/:type' component={ MenuItems } />
    </Switch>
)