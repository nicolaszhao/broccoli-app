/* eslint-disable import/no-extraneous-dependencies */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './publicPath';
import './index.scss';
import './assets/font.scss';
import '@totebox/ui/dist/ui.css';

import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(
  <App />,
  document.getElementById('app'),
);
