import {
	Alert,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import client from '../utils/client';
import { urlForThumbnail } from '../utils/image';

export default function SearchScreen() {
	const router = useRouter();
	const { query = 'all' } = router.query;
	const [state, setState]: any = useState({
		categories: [],
		products: [],
		error: '',
		loading: true,
	});

	const { loading, products, error } = state;
	useEffect(() => {
		const fetchData = async () => {
			try {
				let gQuery = `*[brand match "${query}" || color match "${query}" || category match "${query}" || name match "${query}"] `;
				setState({ loading: true });
				const products = await client.fetch(gQuery);
				setState({ products, loading: false });
			} catch (err: any) {
				setState({ error: err.message, loading: false });
			}
		};
		fetchData();
	}, [query]);

	return (
		<>
			<Head>
				<title>Results - Atalanta A.C.</title>
			</Head>
			<Container maxWidth="xl" sx={{ mb: 'auto' }}>
				<Box
					sx={{
						backgroundColor: '#fff',
						height: '4rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Typography ml={1} variant="h5" display={'flex'}>
						{products && products.length !== 0 ? products.length : 'No'} Results
						{query !== 'all' && query !== '' && ' : ' + query}
						{query !== 'all' && query !== '' ? (
							<Button onClick={() => router.push('/search')}>X</Button>
						) : null}
					</Typography>
				</Box>
				<Divider sx={{ mb: 2 }} />
				{loading ? (
					<CircularProgress />
				) : error ? (
					<Alert>{error}</Alert>
				) : (
					<Box>
						<Grid container gap={3} justifyContent="center" width={'auto'}>
							{products?.map((product: any) => (
								<Link
									passHref
									href={{
										pathname: `/${product?.gender?.toLowerCase()}/${product?.category.toLowerCase()}/${
											product?.slug.current
										}`,
										query: { type: product._type },
									}}
									key={product?._id}>
									<Grid item md={2.5} sm={5} lg={2}>
										<Card sx={{ width: '100%', p: 0.5 }}>
											<CardActionArea>
												<CardMedia
													component="img"
													image={urlForThumbnail(product.image[0])}
													title={product.name}
												/>
											</CardActionArea>
											<CardContent
												sx={{
													height: {
														md: 'auto',
														lg: 170,
													},
												}}>
												<Typography variant="h6">{product.name}</Typography>
												<Typography variant="body1">
													({product.gender})
												</Typography>
												<Typography variant="body1">{`$${product.price.toFixed(
													2
												)}`}</Typography>
											</CardContent>
										</Card>
									</Grid>
								</Link>
							))}
						</Grid>
					</Box>
				)}
			</Container>
		</>
	);
}
