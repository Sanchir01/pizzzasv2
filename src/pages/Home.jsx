import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const { searchValue } = React.useContext(SearchContext);
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	// props drill
	const [categoryId, setACategoryId] = React.useState(0);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [sortType, setSortType] = React.useState({
		name: 'популярности ',
		sortProperty: 'rating'
	});
	React.useEffect(() => {
		setIsLoading(true);
		const sorBy = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		fetch(
			`https://63be7d1df5cfc0949b58980f.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sorBy}&order=${order}${search}`
		)
			.then(res => {
				return res.json();
			})
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);
	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));
	return (
		<>
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories
							value={categoryId}
							onClickCategory={i => setACategoryId(i)}
						/>
						<Sort value={sortType} setSortType={i => setSortType(i)} />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
					<Pagination onChangePage={number => setCurrentPage(number)} />
				</div>
			</div>
		</>
	);
};

export default Home;
