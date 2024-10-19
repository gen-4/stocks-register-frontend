import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from 'reportWebVitals';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { IntlProvider } from 'react-intl';
import { initReactIntl } from 'i18n';

import { App } from 'modules/app';
import app from 'modules/app';

import backend from 'backend';
import { NetworkError } from 'backend';
import configureStore from 'store';
import { Provider } from 'react-redux';


const store = configureStore();

/* Configure backend proxy. */
backend.init(error => store.dispatch(app.actions.error(new NetworkError())));

const {locale, messages} = initReactIntl();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <IntlProvider locale={locale} messages={messages}>
                <App />
            </IntlProvider>
        </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
