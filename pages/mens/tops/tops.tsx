import { Box, Container, Divider, Typography } from '@mui/material';
import React from 'react';
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

const mensTops: React.FC<ProductProps> = ({ tanks, shirts, jackets }) => {
	return (
		<>
			<Container maxWidth="xl">
				{/* Title */}

				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						Mens
					</Typography>
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
		</>
	);
};

export default mensTops;

export async function getStaticProps() {
	const tanks = await client.fetch(`*[_type == "mensTanks"]`);
	const shirts = await client.fetch(`*[_type == "mensShirts"]`);
	const jackets = await client.fetch(`*[_type == "mensJackets"]`);

	return {
		props: {
			tanks,
			shirts,
			jackets,
		},
		revalidate: 15,
	};
}
