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

const WomensBottoms: React.FC<ProductProps> = ({ pants, shorts }) => {
	return (
		<>
			<Layout title={`Women's Bottoms`}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						{`Women's`}
					</Typography>
				</Box>

				<Divider />

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
			</Layout>
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
