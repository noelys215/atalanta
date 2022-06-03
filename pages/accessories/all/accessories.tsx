import React from 'react';
import { Box, CircularProgress, Container, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductsCat from '../../../components/ProductsCat';
import Sort from '../../../components/Sort';
import client from '../../../utils/client';

interface ProductProps {
	accessories?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
}

const Accessories: React.FC<ProductProps> = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [state, setState] = useState<ProductProps>({
		accessories: [],
		error: '',
		loading: true,
		sort: '',
	});

	const { accessories, loading, error, sort } = state;

	const handleSort = (e: any) => {
		return setState({ sort: e.target.value });
	};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const fetchData = async () => {
			try {
				const accessories = await client
					.fetch(`*[_type == "accessories"]`)
					.then((product) =>
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

				setState({ accessories, loading: false, sort });
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
				<Container maxWidth="xl" sx={{ mb: 'auto' }}>
					{/* Title */}

					<Box display={'flex'} justifyContent={'space-between'}>
						<Typography variant="h5" mb={1}>
							Accessories
						</Typography>
						<Sort handleSort={handleSort} />
					</Box>

					<Divider />

					{/* Test */}
					<ProductsCat
						department="accessories"
						title="All Accessories"
						products={accessories}
						type={'accessories'}
						cat={'all'}
					/>
				</Container>
			)}
		</>
	);
};

export default Accessories;
