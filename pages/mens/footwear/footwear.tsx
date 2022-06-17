import { Box, Container, Divider, Typography } from '@mui/material';
import React from 'react';
import ProductsCat from '../../../components/ProductsCat';
import client from '../../../utils/client';

interface ProductProps {
	footwear?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	cat?: string;
}

const mensShoes: React.FC<ProductProps> = ({ footwear }) => {
	return (
		<Box mb={'auto'}>
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
					department="mens"
					title="Footwear"
					products={footwear}
					type={'mensShoes'}
					cat={'footwear'}
				/>
			</Container>
		</Box>
	);
};

export default mensShoes;

export async function getStaticProps() {
	const footwear = await client.fetch(`*[_type == "mensShoes"]`);

	return {
		props: {
			footwear,
		},
		revalidate: 15,
	};
}
