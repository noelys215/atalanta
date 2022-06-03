import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import sideImage from '../public/assets/joggingwoman.jpg';
import client from '../utils/client';
import { urlForThumbnail } from '../utils/image';
// Framer

interface ProductProps {
	tanks?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
}

export const FeaturedItems = (): ReactElement<ProductProps> => {
	const [state, setState] = useState<ProductProps>({
		tanks: [],
		error: '',
		loading: true,
	});

	const { tanks, loading, error } = state;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const tanks = await client
					.fetch(`*[_type == "WomensTops"]`)
					.then((product) => product.map((product: any) => product));

				setState({ tanks, loading: false });
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
				<>
					<Box display={' flex'} flexDirection={'column'} alignItems={'center'} mb={5}>
						{/* Title */}
						<Typography
							variant="h2"
							fontSize={'1.875rem'}
							gutterBottom
							textAlign={'center'}>
							A Running Tradition
						</Typography>
						{/* Desc */}
						<Typography
							lineHeight={1.5}
							variant="body2"
							fontSize={'1.1rem'}
							gutterBottom
							textAlign={'center'}
							width={'80%'}>
							On warm summer days or hanging out at the gym, a good running tank or
							singlet is essential. Whether you need a racing singlet or a tank to
							show off the guns at the gym, we have cultivated the best running tanks
							and singlets for you to choose from.
						</Typography>
					</Box>

					<Box
						sx={{
							display: 'flex',
							flexDirection: {
								xs: 'column',
								md: 'row',
							},
							alignItems: 'center',
							width: '100%',
							height: 'auto',
							mb: 5,
						}}>
						{/* Side Image */}
						<Box sx={{ width: 'auto' }}>
							<Image src={sideImage} alt="logo" />
						</Box>
						{/* Four Products */}

						<Grid container gap={8} justifyContent="center" width={'auto'}>
							{tanks?.slice(0, 4).map((p: any) => (
								<Grid item md={5} xs={4} key={p?._id}>
									<Link href={`/womens/tops/${p?.slug?.current}?type=WomensTops`}>
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
				</>
			)}
		</>
	);
};

export function getServerSideProps(context: any) {
	return {
		props: {
			slug: context.params.slug,
			path: context.query.type,
		},
	};
}
