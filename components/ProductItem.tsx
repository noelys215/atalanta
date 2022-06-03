import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Rating,
	Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { urlForThumbnail } from '../utils/image';

export default function ProductItem({ product }: any) {
	return (
		<Card>
			<NextLink
				href={{
					pathname: `/womens/${product.category.toLowerCase()}/${product.slug.current}`,
					query: { type: product._type },
				}}
				passHref>
				<CardActionArea>
					<CardMedia
						component="img"
						image={urlForThumbnail(product.image[0])}
						title={product.name}></CardMedia>
					<CardContent>
						<Typography>{product.name}</Typography>
						<Rating value={product.rating} readOnly></Rating>
					</CardContent>
				</CardActionArea>
			</NextLink>
			<CardActions>
				<Typography>$ {product.price} </Typography>
			</CardActions>
		</Card>
	);
}
