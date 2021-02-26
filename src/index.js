import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore, { history } from './store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter basename="/">
      <ConnectedRouter history={history}>
          <App />
      </ConnectedRouter>
    </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
