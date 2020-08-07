import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import Search from './Components/Search';
import Details from './Components/Details';
import NotFound from './Components/NotFound';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Search" component={Search} />
        <Route exact path="/Details/:restaurant_id" component={Details} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router; 
