import React, { useState } from 'react';
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { urlForThumbnail } from '../utils/image';
import Sort from '../components/Sort';

interface ProductCatProps {
	products?: any[];
	title?: string;
	type?: any;
	cat?: string;
	department?: any;
	sort?: any;
}

const ProductsCat: React.FC<ProductCatProps> = ({ products, title, type, cat, department }) => {
	console.log(products);
	const [state, setState] = useState<ProductCatProps>({
		sort: '',
	});

	const handleSort = (e: any) => {
		return setState({ sort: e.target.value });
	};

	const { sort } = state;
	const typed: string = type;
	return (
		<>
			<Box
				sx={{
					backgroundColor: '#fff',
					height: '4rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mb: 1.2,
				}}>
				<Typography ml={1} variant="h4">
					{title}
				</Typography>
			</Box>
			<Box>
				<Sort handleSort={handleSort} />
			</Box>
			<Divider sx={{ mb: 2 }} />

			{/* Product Grid */}
			<Box>
				<Grid container gap={2} justifyContent="center" mb={10}>
					{products
						?.sort((a, b): any => {
							if (sort === 'Lowest') {
								return a.price - b.price;
							} else if (sort === 'Highest') {
								return b.price - a.price;
							} else {
								return;
							}
						})
						.map((product) => (
							<Link
								passHref
								href={{
									pathname: `/${department}/${cat}/${product?.slug.current}`,
									query: { type: typed },
								}}
								key={product?.slug?.current}>
								<Grid item md={2.5} sm={5} lg={2.5}>
									<Card sx={{ width: '100%' }}>
										<CardActionArea>
											<CardMedia
												component="img"
												image={urlForThumbnail(product?.image[0])}
												title={product?.name}
											/>
										</CardActionArea>
										<CardContent
											sx={{
												height: {
													md: 200,
													lg: 170,
												},
											}}>
											<Typography variant="h6">{product.name}</Typography>
											<Typography variant="body1">{`$${product?.price.toFixed(
												2
											)}`}</Typography>
										</CardContent>
									</Card>
								</Grid>
							</Link>
						))}
				</Grid>
			</Box>
		</>
	);
};

export default ProductsCat;
