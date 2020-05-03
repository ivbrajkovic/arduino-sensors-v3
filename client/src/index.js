/**
 * Application entry point
 */

import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './store/reducers';

// MUI
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import App from './containers/App';

// Styles
import Theme from './theme/Theme';
import './index.css';

// Redux store
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk), // Async middleware
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Redux devtool
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Theme>
      <CssBaseline />
      <App />
    </Theme>
  </Provider>,
  document.getElementById('root')
);
