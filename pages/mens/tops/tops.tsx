import { Box, CircularProgress, Container, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductsCat from '../../../components/ProductsCat';
import Sort from '../../../components/Sort';
import client from '../../../utils/client';

interface ProductProps {
	tanks?: string[];
	shirts?: string[];
	jackets?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
}

const tops: React.FC<ProductProps> = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [state, setState] = useState<ProductProps>({
		tanks: [],
		error: '',
		loading: true,
		sort: '',
	});

	const { tanks, shirts, jackets, loading, error, sort } = state;

	const handleSort = (e: any) => {
		return setState({ sort: e.target.value });
	};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const fetchData = async () => {
			try {
				const tanks = await client.fetch(`*[_type == "mensTanks"]`).then((product) =>
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

				const shirts = await client.fetch(`*[_type == "mensShirts"]`).then((product) =>
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

				const jackets = await client.fetch(`*[_type == "mensJackets"]`).then((product) =>
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

				setState({ tanks, shirts, jackets, loading: false, sort });
			} catch (err: any) {
				setState({ loading: false, error: err.message });
			}
		};
		fetchData();
	}, [error, sort]);

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
							Mens
						</Typography>
						<Sort handleSort={handleSort} />
					</Box>

					<Divider />

					{/* Test */}
					<ProductsCat
						title="Tanks"
						products={tanks}
						type={'mensTanks'}
						cat={'tops'}
						department="mens"
					/>
					<ProductsCat
						title="Shirts"
						products={shirts}
						type={'mensShirts'}
						cat={'tops'}
						department="mens"
					/>
					<ProductsCat
						title="Jackets"
						products={jackets}
						type={'mensJackets'}
						cat={'tops'}
						department="mens"
					/>
				</Container>
			)}
		</>
	);
};

export default tops;
