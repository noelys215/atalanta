import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import ProductsCat from '../../../components/ProductsCat';
import client from '../../../utils/client';
import Layout from '../../../components/Layout';
interface ProductProps {
	pants?: string[];
	shorts?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
}

const MensBottoms: React.FC<ProductProps> = ({ pants, shorts }) => {
	return (
		<>
			<Layout title={`Men's Bottoms`}>
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
			</Layout>
		</>
	);
};

export default MensBottoms;

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
