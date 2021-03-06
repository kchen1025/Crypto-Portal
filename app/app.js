import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import Main from './containers/MainContainer';
import {Provider} from 'react-redux';
import store from './store';
import routes from './routes';

import {AppContainer} from 'react-hot-loader';


ReactDOM.render(
	<AppContainer>
		<Provider store={store}>
			<Router history={browserHistory} routes={routes}/>
		</Provider>
	</AppContainer>,
	document.getElementById('app')
);	






