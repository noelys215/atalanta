import ProductScreen from '../../../components/ProductScreen';

const SingleProduct = (props: any) => {
	const { slug }: any = props;
	const { path }: any = props;

	return (
		<>
			<ProductScreen slug={slug} path={path} />
		</>
	);
};

export default SingleProduct;

export function getServerSideProps(context: any) {
	return {
		props: {
			slug: context.params.slug,
			path: context.query.type,
		},
	};
}
