import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../../components/Layout';
import ProductsCat from '../../../components/ProductsCat';
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

const WomensTops: React.FC<ProductProps> = ({ tanks, shirts, jackets }) => {
	return (
		<>
			<Layout title={`Women's Tops`}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						{`Women's`}
					</Typography>
				</Box>

				<Divider />

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
			</Layout>
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
			tanks,
			shirts,
			jackets,
		},
		revalidate: 15,
	};
}
