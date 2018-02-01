import React from 'react';

import { Route, IndexRoute} from 'react-router';
import Main from './containers/MainContainer';
import Home from './containers/HomeContainer';

export default(
	<Route path="/" component={Main}>
		<IndexRoute component={Home}/>
	</Route>
);