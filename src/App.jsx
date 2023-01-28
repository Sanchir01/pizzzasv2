import React from 'react';
import './scss/app.scss';

import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { useDispatch, useSelector } from 'react-redux';
// import {decrement,increment} from "./redux/slices/FilterSlice";

export const SearchContext = React.createContext('');

function App() {
	const [searchValue, setSearchValue] = React.useState('');
	const count = useSelector(state => state.count.count);
	const dispatch = useDispatch();
	return (
		<div className='App'>
			<div className='wrapper'>
				<SearchContext.Provider value={{ searchValue, setSearchValue }}>
					<Header />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</SearchContext.Provider>
			</div>
		</div>
	);
}

export default App;
