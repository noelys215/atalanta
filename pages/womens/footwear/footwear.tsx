import { Box, Button, CircularProgress, Container, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductsCat from '../../../components/ProductsCat';
import Sort from '../../../components/Sort';
import client from '../../../utils/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ProductProps {
	footwear?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
	cat?: string;
}

const Footwear: React.FC<ProductProps> = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [state, setState] = useState<ProductProps>({
		footwear: [],
		error: '',
		loading: true,
		sort: '',
	});
	const router = useRouter();

	const { footwear, loading, sort } = state;

	const handleSort = (e: any) => {
		return setState({ sort: e.target.value });
	};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const fetchData = async () => {
			try {
				const footwear = await client.fetch(`*[_type == "womensShoes"]`).then((product) =>
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

				setState({ footwear, loading: false, sort });
			} catch (err: any) {
				setState({ loading: false, error: err.message });
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sort]);

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
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}>
							<Button onClick={() => router.back()}>
								<ArrowBackIcon sx={{ p: 0 }} />
							</Button>
							<Typography variant="h5">Womens</Typography>
						</Box>
						<Sort handleSort={handleSort} />
					</Box>

					<Divider />

					{/* Test */}
					<ProductsCat
						department="womens"
						title="Footwear"
						products={footwear}
						type={'womensShoes'}
						cat={'footwear'}
					/>
				</Container>
			)}
		</>
	);
};

export default Footwear;
