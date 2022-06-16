import { Box, Container, Divider, Typography } from '@mui/material';
import React from 'react';
import ProductsCat from '../../../components/ProductsCat';
// import Sort from '../../../components/Sort';
import client from '../../../utils/client';

interface ProductProps {
	shirts?: string[];
	tanks?: string[];
	jackets?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
}

const WomensTops: React.FC<ProductProps> = ({ tanks, shirts, jackets }: ProductProps) => {
	return (
		<>
			<Container maxWidth="xl">
				{/* Title */}

				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						Womens
					</Typography>
					{/* <Sort handleSort={handleSort} /> */}
				</Box>

				<Divider />

				{/* Test */}
				<ProductsCat
					title="Tanks"
					products={tanks}
					type={'WomensTops'}
					cat={'tops'}
					department="womens"
				/>
				<ProductsCat
					department="womens"
					title="Shirts"
					products={shirts}
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
		</>
	);
};

export default WomensTops;

export async function getStaticProps() {
	const tanks = await client.fetch(`*[_type == "WomensTops"]`);
	const shirts = await client.fetch(`*[_type == "womensShirts"]`);
	const jackets = await client.fetch(`*[_type == "womensJackets"]`);

	return {
		props: {
			shirts,
			tanks,
			jackets,
		},
		revalidate: 15,
	};
}
