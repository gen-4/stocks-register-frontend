import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import { Login, Logout, Register } from 'modules/user';
import { ManageUsers, ManageStocksRequests } from 'modules/admin';
import { Stocks, CreateStock } from 'modules/stocks';

import user from 'modules/user';

const Body = () => {

	const loggedIn = useSelector(user.selectors.isLoggedIn);
	const isAdmin = useSelector(user.selectors.isAdmin);
	const isUser = useSelector(user.selectors.isUser);

	return (

		<div className="container" style={{ paddingTop: '10%' }}>
			<br />
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} >
				<AppGlobalComponents />
			</div>
			<Routes>
				<Route path="/" element={ <Home/> } />
				{ !loggedIn && <Route path="/login" element={ <Login /> } /> }
				{ !loggedIn && <Route path="/register" element={ <Register /> } /> }
				{ loggedIn && <Route path="/logout" element={ <Logout /> } /> }
				{ isAdmin && <Route path="/admin/users" element={ <ManageUsers /> } /> }
				{ isAdmin && <Route path="/stocks/manage-requests" element={ <ManageStocksRequests /> } /> }
				{ isUser && <Route path="/stocks" element={ <Stocks /> } /> }
				{ isUser && <Route path="/stocks/request" element={ <CreateStock /> } /> }
				{/* 
				{loggedIn && <Route exact path="/search/enterprise/:id"><FindEnterpriseResult /></Route>}
				{(loggedIn && !isAdmin) && <Route exact path="/market/transfer"><TransferPage /></Route>}
				{(loggedIn && isAdmin) && <Route exact path="/market/update_enterprise/:id"><UpdateEnterprise /></Route>}
				{(loggedIn && !isAdmin) && <Route exact path="/market/transfer"><TransferPage /></Route>}
				{(loggedIn && !isAdmin) && <Route exact path="/market/create_order/:id/:entepriseName/:type"><CreateOrders /></Route>}
				{(loggedIn && !isAdmin) && <Route exact path="/market/create_order_market_price/:id/:type"><OrderByMarketPrice /></Route>} */}
				<Route path="*" element={ <Home/> } />
			</Routes>
		</div>

	);

};

export default Body;
