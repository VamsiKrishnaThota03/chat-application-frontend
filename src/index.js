import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';

import 'antd/dist/antd.css';
import './index.css';

import App from './App';
import { history } from './config/network';

ReactDOM.render(
    <React.StrictMode>
        <Router history={history}>
            <Route component={App} />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
