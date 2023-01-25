import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	React.useEffect(() => {
		fetch('https://63be7d1df5cfc0949b58980f.mockapi.io/item')
			.then(res => {
				return res.json();
			})
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
			});
	}, []);
	return (
		<>
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{isLoading
							? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
							: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
					</div>
					<ul className='Pagination_root__uwB0O'>
						<li className='previous disabled'>
							<a
								className=' '
								tabIndex='-1'
								role='button'
								aria-disabled='true'
								aria-label='Previous page'
								rel='prev'
							>
								&lt;
							</a>
						</li>
						<li className='selected'>
							<a
								rel='canonical'
								role='button'
								tabIndex='-1'
								aria-label='Page 1 is your current page'
								aria-current='page'
							>
								1
							</a>
						</li>
						<li>
							<a rel='next' role='button' tabIndex='0' aria-label='Page 2'>
								2
							</a>
						</li>
						<li>
							<a role='button' tabIndex='0' aria-label='Page 3'>
								3
							</a>
						</li>
						<li className='next'>
							<a
								className=''
								tabIndex='0'
								role='button'
								aria-disabled='false'
								aria-label='Next page'
								rel='next'
							>
								&gt;
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Home;
