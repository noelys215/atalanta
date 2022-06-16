import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import client from '../utils/client';
import { urlForThumbnail } from '../utils/image';
interface ProductProps {
	mensShoes?: string[];
	womensShoes?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
}

const ProductsGrid = (): ReactElement<ProductProps> => {
	const [state, setState] = useState<ProductProps>({
		mensShoes: [],
		error: '',
		loading: true,
	});

	const { mensShoes, womensShoes, loading, error } = state;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const mensShoes = await client
					.fetch(`*[_type == "mensShoes"]`)
					.then((product) => product.map((product: any) => product));

				const womensShoes = await client
					.fetch(`*[_type == "womensShoes"]`)
					.then((product) => product.map((product: any) => product));

				setState({ mensShoes, womensShoes, loading: false });
			} catch (err: any) {
				setState({ loading: false, error: err.message });
			}
		};
		fetchData();
	}, [error]);

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
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						mb: 10,
					}}>
					<Typography
						variant="h3"
						component="h1"
						fontFamily={'Source Code Pro'}
						textAlign="center"
						width={'100%'}
						gutterBottom>
						Celestial Shoe Rack
					</Typography>
					<Grid
						container
						spacing={2}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						{mensShoes?.slice(0, 4).map((p: any) => (
							<Grid item md={3} sm={4} xs={6} key={p?._id}>
								<Link href={`/mens/footwear/${p?.slug?.current}?type=mensShoes`}>
									<a>
										<Image
											src={urlForThumbnail(p?.image[0])}
											width={450}
											height={450}
											alt={p?.name}
										/>
									</a>
								</Link>
								<Box p={1}>
									<Typography>{p?.name}</Typography>
									<Typography>{`$${p?.price.toFixed(2)}`}</Typography>
								</Box>
							</Grid>
						))}

						{womensShoes?.slice(3, 7).map((p: any) => (
							<Grid item md={3} sm={4} xs={6} key={p?._id}>
								<Link href={`/mens/footwear/${p?.slug?.current}?type=womensShoes`}>
									<a>
										<Image
											src={urlForThumbnail(p?.image[0])}
											width={450}
											height={450}
											alt={p?.name}
										/>
									</a>
								</Link>
								<Box p={1}>
									<Typography>{p?.name}</Typography>
									<Typography>{`$${p?.price.toFixed(2)}`}</Typography>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			)}
		</>
	);
};

export default ProductsGrid;
