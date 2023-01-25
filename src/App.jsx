import React from 'react';
import './scss/app.scss';

import Header from './components/Header.jsx';
import Home from './pages/home.jsx';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';

function App() {
	return (
		<div className='App'>
			<div className='wrapper'>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/' element={<Home />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
