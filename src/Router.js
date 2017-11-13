import React from "react";
import { Switch, Route} from "react-router-dom";

import HomePage from './components/HomePage';
import Menu from './components/Menu';
import AdminPage from './components/AdminPage';
import MenuItems from './components/MenuItems';
import Checkout from './components/Checkout';
import Specials from './components/Specials';

export default (
    <Switch>
        <Route exact path='/' component={ HomePage }/>
        <Route path='/menu' component={ Menu} />
        <Route path='/admin' component={ AdminPage } />
        <Route path='/specials' component={ Specials } />
        <Route path='/checkout/:table' component={ Checkout} />
        <Route path='/:type' component={ MenuItems } />
    </Switch>
)