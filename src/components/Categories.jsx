import React from 'react';

function Categories() {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const categories = [
		'все',
		'мясные',
		'вегетарианские',
		'гриль',
		'Острые',
		'Закрытые'
	];
	const onClickCategory = i => {
		setActiveIndex(i);
	};
	return (
		<>
			<div className='categories'>
				<ul>
					{categories.map((value, i) => (
						<li
							onClick={() => onClickCategory(i)}
							className={activeIndex === i ? 'active' : ''}
						>
							{value}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default Categories;
