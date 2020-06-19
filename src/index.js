import 'babel-polyfill';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Home from './app/Home';
import store from './store/index';
import './style/common.css';
import 'antd-mobile/dist/antd-mobile.css';

/* eslint-disable */
ReactDOM.render(
    <Provider store={store}>
        <Home />
    </Provider>,
    document.getElementById('app'),
);
/* eslint-enable */
