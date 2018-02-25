import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
/*import '../node_modules/popper.js/dist/popper.min.js';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'*/
import App from './App';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
		<App/>
	</Provider>,
  document.body);
