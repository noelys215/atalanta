import { CircularProgress, Divider, Grid, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useReducer } from 'react';
import toast from 'react-hot-toast';
import { getError } from '../../utils/error';
import { Store } from '../../utils/store';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Layout from '../../components/Layout';

function reducer(state: any, action: any) {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, order: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		case 'PAY_REQUEST':
			return { ...state, loadingPay: true };
		case 'PAY_SUCCESS':
			return { ...state, loadingPay: false, successPay: true };
		case 'PAY_FAIL':
			return { ...state, loadingPay: false, errorPay: action.payload };
		case 'PAY_RESET':
			return { ...state, loadingPay: false, successPay: false, errorPay: '' };
	}
}

const OrderHistoryScreen = ({ params }: any) => {
	const { id: orderId } = params;
	const [{ loading, error, order, successPay }, dispatch] = useReducer(reducer, {
		loading: true,
		order: {},
		error: '',
	});

	const {
		shippingAddress,
		paymentMethod,
		orderItems,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		isPaid,
		paidAt,
		isDelivered,
		deliveredAt,
	} = order;

	const router = useRouter();
	const { state } = useContext(Store);
	const { userInfo } = state;

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

	// @ts-ignore: Unreachable code error
	useEffect(() => {
		if (!userInfo) {
			return router.push('/login');
		}
		const fetchOrder = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(`/api/orders/${orderId}`, {
					headers: { authorization: `Bearer ${userInfo.token}` },
				});

				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};
		if (!order._id || successPay || (order._id && order._id !== orderId)) {
			fetchOrder();
			if (successPay) {
				dispatch({ type: 'PAY_RESET' });
			}
		} else {
			const loadPaypalScript = async () => {
				const { data: clientId } = await axios.get('/api/keys/paypal', {
					headers: { authorization: `Bearer ${userInfo.token}` },
				});
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': clientId,
						currency: 'USD',
					},
				});
				// @ts-ignore: Unreachable code error
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
			};
			loadPaypalScript();
		}
	}, [order, orderId, paypalDispatch, router, successPay, userInfo]);

	function createOrder(data: any, actions: any) {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: { value: totalPrice },
					},
				],
			})
			.then((orderID: any) => {
				return orderID;
			});
	}
	function onApprove(data: any, actions: any) {
		return actions.order.capture().then(async function (details: any) {
			try {
				dispatch({ type: 'PAY_REQUEST' });
				const { data } = await axios.put(`/api/orders/${order._id}/pay`, details, {
					headers: { authorization: `Bearer ${userInfo.token}` },
				});
				dispatch({ type: 'PAY_SUCCESS', payload: data });
				toast('Order is paid');
			} catch (err) {
				dispatch({ type: 'PAY_FAIL', payload: getError(err) });
				toast(getError(err));
			}
		});
	}
	function onError(err: any) {
		toast(getError(err));
	}

	return (
		<Layout title={'Order'}>
			<Box display={'flex'}>
				{loading ? (
					<CircularProgress color="primary" variant="determinate" />
				) : error ? (
					toast(getError(error))
				) : (
					<>
						<Grid
							container
							maxWidth="lg"
							sx={{
								p: 5,
								minHeight: 1000,
								mt: 10,
								ml: 'auto',
								mr: 'auto',
								backgroundColor: '#fffcf7',
							}}>
							{/* Shipping Address */}
							<Grid item md={12} sm={12} xs={12}>
								<Typography variant="h6" sx={{ mt: 4 }}>
									Order Summary: #{orderId.toUpperCase()}
								</Typography>
								<Divider sx={{ mb: 4, justifySelf: 'center' }} />
							</Grid>
							<Grid item md={6} sm={12} xs={12}>
								<Typography sx={{ mt: 4 }}>Shipping Address</Typography>
								<Divider sx={{ mb: 2, justifySelf: 'center' }} />
								<List>
									<ListItem>
										{shippingAddress?.firstName} {shippingAddress?.lastName}
									</ListItem>
									<ListItem>{shippingAddress?.address}</ListItem>
									<ListItem>
										{shippingAddress?.city} {shippingAddress?.state}{' '}
										{shippingAddress?.postalCode}{' '}
									</ListItem>
									<ListItem>{shippingAddress?.country}</ListItem>
									<ListItem>
										Status:{' '}
										{isDelivered
											? `Delivered at ${deliveredAt}`
											: 'Not delivered'}
									</ListItem>
								</List>
							</Grid>

							{/* Payment Method */}
							<Grid item md={6} sm={12} xs={12}>
								<Typography sx={{ mt: 4 }}>Payment Method</Typography>
								<Divider sx={{ mb: 2, justifySelf: 'center' }} />
								<List>
									<ListItem>{paymentMethod}</ListItem>
									<ListItem>
										Status: {isPaid ? `paid at ${paidAt}` : 'not paid'}
									</ListItem>
								</List>
							</Grid>

							{/* Ordered Items */}
							<Grid item md={12} sm={12} xs={12}>
								<Typography sx={{ mt: 4 }}>Ordered Items</Typography>
								<Divider sx={{ mb: 2, justifySelf: 'center' }} />
							</Grid>

							{/* <ListItem> */}
							{orderItems.map((item: any) => (
								<Grid
									item
									md={4}
									sm={12}
									xs={12}
									key={item._key}
									display={'flex'}
									mb={2}>
									<Box>
										<Image
											src={item.image}
											width={180}
											height={180}
											alt={item.name}
										/>
									</Box>

									<Box ml={2.5} width={'60%'}>
										<Typography variant="body1" gutterBottom>
											<q>{item.name}</q>
										</Typography>
										<Typography variant="body2">Size: {item.size}</Typography>
										<Typography variant="body2">
											Quantity: {item.quantity}
										</Typography>
										<Typography variant="body2">
											Price: {`$${item.price.toFixed(2)}`}
										</Typography>
										<Typography variant="body2">Color: Black</Typography>
									</Box>
								</Grid>
							))}
							{/* </ListItem> */}

							{/* Order Summary */}
							<Grid item md={12} sm={12} xs={12}>
								<Typography sx={{ mt: 4 }}>Ordered Summary</Typography>
								<Divider sx={{ mb: 2, justifySelf: 'center' }} />

								<Grid container gap={3} justifyContent={'center'} height={'auto'}>
									<Grid item md={4} sm={12} xs={12}>
										<List>
											<ListItem>
												<Grid container>
													<Grid item xs={6}>
														<Typography>Items:</Typography>
													</Grid>
													<Grid item xs={6}>
														<Typography align="right">
															$ {itemsPrice}
														</Typography>
													</Grid>
												</Grid>
											</ListItem>
											<ListItem>
												<Grid container>
													<Grid item xs={6}>
														<Typography>Tax:</Typography>
													</Grid>
													<Grid item xs={6}>
														<Typography align="right">
															$ {taxPrice}
														</Typography>
													</Grid>
												</Grid>
											</ListItem>
											<ListItem>
												<Grid container>
													<Grid item xs={6}>
														<Typography>Shipping:</Typography>
													</Grid>
													<Grid item xs={6}>
														<Typography align="right">
															$ {shippingPrice}
														</Typography>
													</Grid>
												</Grid>
											</ListItem>
											<ListItem>
												<Grid container>
													<Grid item xs={6}>
														<Typography>
															<strong>Total:</strong>
														</Typography>
													</Grid>
													<Grid item xs={6}>
														<Typography align="right">
															<strong>$ {totalPrice}</strong>
														</Typography>
													</Grid>
												</Grid>
											</ListItem>
										</List>
									</Grid>

									{/* Paypal */}
									{!isPaid && (
										<Grid item md={5} sm={12} xs={12}>
											{isPending ? (
												<CircularProgress />
											) : (
												<Box width={'100%'} mt={{ xs: 1, md: 6 }}>
													<PayPalButtons
														fundingSource={'paypal'}
														style={{
															color: 'black',
															label: 'checkout',
														}}
														createOrder={createOrder}
														onApprove={onApprove}
														onError={onError}
													/>
													<PayPalButtons
														fundingSource={'paylater'}
														style={{
															color: 'black',
															label: 'checkout',
														}}
														createOrder={createOrder}
														onApprove={onApprove}
														onError={onError}
													/>
												</Box>
											)}
										</Grid>
									)}
								</Grid>
							</Grid>
						</Grid>
					</>
				)}
			</Box>
		</Layout>
	);
};

export function getServerSideProps({ params }: any) {
	return { props: { params } };
}

export default dynamic(() => Promise.resolve(OrderHistoryScreen), { ssr: false });
