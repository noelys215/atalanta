import React from 'react';
import { Box, CircularProgress, Container, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductsCat from '../../../components/ProductsCat';
import Sort from '../../../components/Sort';
import client from '../../../utils/client';
interface ProductProps {
	pants?: string[];
	shorts?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
}

const tops: React.FC<ProductProps> = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [state, setState] = useState<ProductProps>({
		pants: [],
		shorts: [],
		error: '',
		loading: true,
		sort: '',
	});

	const { pants, shorts, loading, error, sort } = state;

	const handleSort = (e: any) => {
		return setState({ sort: e.target.value });
	};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const fetchData = async () => {
			try {
				const shorts = await client.fetch(`*[_type == "mensShorts"]`).then((product) =>
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

				const pants = await client.fetch(`*[_type == "mensPants"]`).then((product) =>
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

				setState({ shorts, pants, loading: false, sort });
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
							Mens
						</Typography>
						<Sort handleSort={handleSort} />
					</Box>

					<Divider />

					{/* Test */}
					<ProductsCat
						department="mens"
						title="Shorts"
						products={shorts}
						type={'mensShorts'}
						cat={'bottoms'}
					/>
					<ProductsCat
						department="mens"
						title="Pants"
						products={pants}
						type={'mensPants'}
						cat={'bottoms'}
					/>
				</Container>
			)}
		</>
	);
};

export default tops;
