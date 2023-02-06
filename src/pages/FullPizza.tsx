import { useParams } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();
	React.useEffect(() => {
		async function getPizza() {
			const { data } = await axios.get(
				'https://63be7d1df5cfc0949b58980f.mockapi.io/item/' + id
			);
			setPizza(data);
		}

		getPizza();
	}, []);

	if (!pizza) {
		return <>Загрузка</>;
	}
	return (
		<>
			<div className='container'>
				<img src={pizza.imageUrl} />
				<h2>{pizza.title}</h2>
				<h4>{pizza.price}</h4>
			</div>
		</>
	);
};
export default FullPizza;
