import React from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import ProductsCat from '../../../components/ProductsCat';
import client from '../../../utils/client';
interface ProductProps {
	pants?: string[];
	shorts?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
}

const WomensBottoms: React.FC<ProductProps> = ({ pants, shorts }) => {
	return (
		<>
			(
			<Container maxWidth="xl" sx={{ mb: 'auto' }}>
				{/* Title */}

				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						Womens
					</Typography>
				</Box>

				<Divider />

				{/* Test */}
				<ProductsCat
					department="womens"
					title="Shorts"
					products={shorts}
					type={'womensShorts'}
					cat={'bottoms'}
				/>
				<ProductsCat
					department="womens"
					title="Pants"
					products={pants}
					type={'womensPants'}
					cat={'bottoms'}
				/>
			</Container>
			)
		</>
	);
};

export default WomensBottoms;

export async function getStaticProps() {
	const shorts = await client.fetch(`*[_type == "womensShorts"]`);
	const pants = await client.fetch(`*[_type == "womensPants"]`);

	return {
		props: {
			shorts,
			pants,
		},
		revalidate: 15,
	};
}
