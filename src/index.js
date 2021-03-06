
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import Page from './containers/Page'
import Collection from './containers/Collection'
import store from './store'
import config from './config'

import * as DataActions from './actions/data'

document.body.classList.remove('ready');
document.getElementById('root').innerHTML = '';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={config.base} component={App} onEnter={()=>store.dispatch(DataActions.pullData())}>
        <IndexRoute component={Page} />
        <Route path=":id" component={Page} />
        <Route path=":id/:collection" component={Page} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
