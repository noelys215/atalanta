import { Box, CircularProgress, Container, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductsCat from '../../../components/ProductsCat';
import Sort from '../../../components/Sort';
import client from '../../../utils/client';

interface ProductProps {
	shirts?: string[];
	shoes?: string[];
	jackets?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
}

<<<<<<< HEAD
const WomensTops: React.FC<ProductProps> = ({ tanks, shirts, jackets }: ProductProps) => {
=======
const tops: React.FC<ProductProps> = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [state, setState] = useState<ProductProps>({
		shirts: [],
		error: '',
		loading: true,
		sort: '',
	});

	const { shirts, shoes, jackets, loading, error, sort } = state;

	const handleSort = (e: any) => {
		return setState({ sort: e.target.value });
	};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const fetchData = async () => {
			try {
				const shirts = await client.fetch(`*[_type == "WomensTops"]`).then((product) =>
					product
						.map((product: any) => product)
						.sort((a: any, b: any) => {
							if (sort === 'Lowest') {
								return a.price - b.price;
							} else if (sort === 'Highest') {
								return b.price - a.price;
							} else if (sort === '') {
								return product;
							} else {
								return;
							}
						})
				);

				const shoes = await client.fetch(`*[_type == "womensShirts"]`).then((product) =>
					product
						.map((product: any) => product)
						.sort((a: any, b: any) => {
							if (sort === 'Lowest') {
								return a.price - b.price;
							} else if (sort === 'Highest') {
								return b.price - a.price;
							} else {
								return;
							}
						})
				);

				const jackets = await client.fetch(`*[_type == "womensJackets"]`).then((product) =>
					product
						.map((product: any) => product)
						.sort((a: any, b: any) => {
							if (sort === 'Lowest') {
								return a.price - b.price;
							} else if (sort === 'Highest') {
								return b.price - a.price;
							} else {
								return;
							}
						})
				);

				setState({ shirts, shoes, jackets, loading: false, sort });
			} catch (err: any) {
				setState({ loading: false, error: err.message });
			}
		};
		fetchData();
	}, [error, sort]);

>>>>>>> parent of 050b63e (refactored slug & started implimenting ISR)
	return (
		<>
			{loading ? (
				<Container maxWidth="xl">
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
						}}>
						<CircularProgress />
					</Box>
				</Container>
			) : (
				<Container maxWidth="xl">
					{/* Title */}

					<Box display={'flex'} justifyContent={'space-between'}>
						<Typography variant="h5" mb={1}>
							Womens
						</Typography>
						<Sort handleSort={handleSort} />
					</Box>

					<Divider />

					{/* Test */}
					<ProductsCat
						title="Tanks"
						products={shirts}
						type={'WomensTops'}
						cat={'tops'}
						department="womens"
					/>
					<ProductsCat
						department="womens"
						title="Shirts"
						products={shoes}
						type={'womensShirts'}
						cat={'tops'}
					/>
					<ProductsCat
						department="womens"
						title="Jackets / Sweatshirts"
						products={jackets}
						type={'womensJackets'}
						cat={'tops'}
					/>
				</Container>
			)}
		</>
	);
};

export default tops;
