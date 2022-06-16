import React from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import ProductsCat from '../../../components/ProductsCat';
import client from '../../../utils/client';

interface ProductProps {
	accessories?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
}

const Accessories: React.FC<ProductProps> = ({ accessories }) => {
	return (
		<>
			(
			<Container maxWidth="xl" sx={{ mb: 'auto' }}>
				{/* Title */}

				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						Accessories
					</Typography>
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
			)
		</>
	);
};

export default Accessories;

export async function getStaticProps() {
	const accessories = await client.fetch(`*[_type == "accessories"]`);

	return {
		props: {
			accessories,
		},
		revalidate: 15,
	};
}
