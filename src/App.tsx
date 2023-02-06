import './scss/app.scss';

import Header from './components/Header.js';
import Home from './pages/Home.js';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';

function App() {
	return (
		<div className='App'>
			<div className='wrapper'>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/pizza/:id' element={<FullPizza />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
