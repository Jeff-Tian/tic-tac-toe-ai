import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from "./layout/layout";
import { Auth0Provider } from './contexts/auth0-context';

ReactDOM.render(
    <Auth0Provider>
        <Layout />
    </Auth0Provider>,
    document.getElementById('root')
);
