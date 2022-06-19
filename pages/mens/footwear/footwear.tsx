import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../../components/Layout';
import ProductsCat from '../../../components/ProductsCat';
import client from '../../../utils/client';

interface ProductProps {
	footwear?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	cat?: string;
}

const MensShoes: React.FC<ProductProps> = ({ footwear }) => {
	return (
		<>
			<Layout title={`Men's Footwear`}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						Mens
					</Typography>
				</Box>
				<Divider />

				<ProductsCat
					department="mens"
					title="Footwear"
					products={footwear}
					type={'mensShoes'}
					cat={'footwear'}
				/>
			</Layout>
		</>
	);
};

export default MensShoes;

export async function getStaticProps() {
	const footwear = await client.fetch(`*[_type == "mensShoes"]`);

	return {
		props: {
			footwear,
		},
		revalidate: 15,
	};
}
