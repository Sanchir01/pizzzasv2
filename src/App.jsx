import React from 'react';
import './scss/app.scss';

import Header from './components/Header.jsx';
import Home from './pages/home.jsx';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

function App() {
	return (
		<div className='App'>
			<div className='wrapper'>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
