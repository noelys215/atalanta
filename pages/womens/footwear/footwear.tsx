import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import ProductsCat from '../../../components/ProductsCat';
import client from '../../../utils/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ProductProps {
	footwear?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
	cat?: string;
}

const WomensShoes: React.FC<ProductProps> = ({ footwear }) => {
	const router = useRouter();

	return (
		<>
			(
			<Container maxWidth="xl">
				{/* Title */}

				<Box display={'flex'} justifyContent={'space-between'}>
					<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
						<Button onClick={() => router.back()}>
							<ArrowBackIcon sx={{ p: 0 }} />
						</Button>
						<Typography variant="h5">Womens</Typography>
					</Box>
				</Box>

				<Divider />

				{/* Test */}
				<ProductsCat
					department="womens"
					title="Footwear"
					products={footwear}
					type={'womensShoes'}
					cat={'footwear'}
				/>
			</Container>
			)
		</>
	);
};

export default WomensShoes;

export async function getStaticProps() {
	const footwear = await client.fetch(`*[_type == "womensShoes"]`);

	return {
		props: {
			footwear,
		},
		revalidate: 15,
	};
}
