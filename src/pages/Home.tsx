import React from 'react';
import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const { sort, categoryId, currentPage, searchValue } = useSelector(
		(state: RootState) => state.filter
	);
	const { status, items } = useSelector(selectPizzaData);

	const onChangeCategory = React.useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);
	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};
	const feactP = async () => {
		const sorBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		dispatch(
			fetchPizzas({
				sorBy,
				order,
				category,
				currentPage: String(currentPage),
				search
			})
		);

		window.scrollTo(0, 0);
	};
	React.useEffect(() => {
		feactP();
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));
	return (
		<>
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories value={categoryId} onClickCategory={onChangeCategory} />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{status === 'loading' ? skeletons : pizzas}
					</div>
					<Pagination onChangePage={onChangePage} />
				</div>
			</div>
		</>
	);
};

export default Home;
