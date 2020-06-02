/* eslint-disable import/no-extraneous-dependencies */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './configs/public-path';
import './assets/base.scss';

import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(
  <App />,
  document.getElementById('app'),
);
