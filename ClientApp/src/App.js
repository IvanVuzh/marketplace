import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';

import ProductDetailed from './components/ProductDetailed';
import UserDetailed from './components/UserDetailed';
import UserCatalog from './components/UserCatalog';
import ProductCatalog from './components/ProductCatalog';
import ProductCreation from './components/ProductCreation';
import CategoryCatalog from './components/CategoryCatalog';
import CategoryDetailed from './components/CategoryDetailed';

import httpInit from './httpInit';
//import "bootstrap/dist/css/bootstrap.min.css";
import './custom.css'
import CommentCatalog from './components/CommentCatalog';
import CommentCreation from './components/CommentCreation';

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
            <Route exact path='/user/detail/:id' component={UserDetailed}/>
            <Route exact path='/product/detail/:id' component={ProductDetailed}/>
            <Route exact path='/product/comments/:productId' component={CommentCatalog}/>
            <Route exact path='/create-comment/:productId' component={CommentCreation}/>
            <Route exact path='/category/detail/:id' component={CategoryDetailed}/>
            <Route exact path='/categories' component={CategoryCatalog} />
            <Route exact path='/create-product' component={ProductCreation} />
            <Route component={ProductCatalog} />

          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
