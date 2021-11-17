import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';

import ProductDetailed from './components/ProductDetailed';
import UserDetailed from './components/UserDetailed';
import UserCatalog from './components/UserCatalog';
import ProductCatalog from './components/ProductCatalog';

import httpInit from './httpInit';
//import "bootstrap/dist/css/bootstrap.min.css";
import './custom.css'

httpInit();

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/users' component={UserCatalog} />
            <Route exact path='/products' component={ProductCatalog} />
            <Route exact path='/user/update/:id' component={UserDetailed}/>
            <Route exact path='/product/update/:id' component={ProductDetailed}/>
            <Route component={ProductCatalog} />

          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
