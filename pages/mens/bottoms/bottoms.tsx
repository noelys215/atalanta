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

const mensBottoms: React.FC<ProductProps> = ({ pants, shorts }) => {
	return (
		<>
			(
			<Container maxWidth="xl" sx={{ mb: 'auto' }}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						Mens
					</Typography>
				</Box>
				<Divider />

				{/* Test */}
				<ProductsCat
					department="mens"
					title="Shorts"
					products={shorts}
					type={'mensShorts'}
					cat={'bottoms'}
				/>
				<ProductsCat
					department="mens"
					title="Pants"
					products={pants}
					type={'mensPants'}
					cat={'bottoms'}
				/>
			</Container>
			)
		</>
	);
};

export default mensBottoms;

export async function getStaticProps() {
	const shorts = await client.fetch(`*[_type == "mensShorts"]`);
	const pants = await client.fetch(`*[_type == "mensPants"]`);

	return {
		props: {
			shorts,
			pants,
		},
		revalidate: 15,
	};
}
