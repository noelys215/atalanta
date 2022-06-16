import ProductScreen from '../../../components/ProductScreen';
import client from '../../../utils/client';

export default function SingleProduct({ product }: any) {
	return <ProductScreen product={product} />;
}

export async function getStaticProps(context: any) {
	const slug = context.params.slug;

	const product = await client.fetch(`*[_type == "accessories" && slug.current == $slug][0]`, {
		slug,
	});

	return {
		props: {
			product,
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const res = await client.fetch(`*[_type == "accessories"]`);
	const paths = res.map((post: any) => ({
		params: { slug: post.slug.current },
	}));
	return { paths, fallback: true };
}
