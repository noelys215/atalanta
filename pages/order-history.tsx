import {
	Alert,
	Button,
	CircularProgress,
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useReducer } from 'react';
import { getError } from '../utils/error';
import { Store } from '../utils/store';

function reducer(state: any, action: any) {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, orders: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			state;
	}
}

function OrderHistoryScreen() {
	const router = useRouter();
	const { state } = useContext(Store);
	const { userInfo } = state;

	const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
		loading: 'true',
		orders: [],
		error: '',
	});

	useEffect(() => {
		if (!userInfo) {
			router.push('/register');
		}
		const fetchOrders = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(`/api/orders/history`, {
					headers: { authorization: `Bearer ${userInfo.token}` },
				});

				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};
		fetchOrders();
	}, [router, userInfo]);

	return (
		<Box
			mb={'auto'}
			maxWidth="lg"
			sx={{
				p: 2,
				minHeight: '62.5rem',
				width: '100%',
				m: 'auto',
				mt: 10,
				backgroundColor: '#fffcf7',
				display: 'flex',
				flexDirection: 'column',
			}}>
			<Head>
				<title>Order History - Atalanta A.C.</title>
			</Head>
			<Grid item md={12} sm={12} xs={12}>
				<Box sx={{ width: { md: '80%', sm: '100%' }, m: 'auto' }}>
					<Typography variant="h6" sx={{ mt: 4 }}>
						Order History
					</Typography>
					<Divider sx={{ mb: 4, justifySelf: 'center' }} />
				</Box>
				{loading ? (
					<CircularProgress sx={{ display: 'flex', justifyContent: 'center' }} />
				) : error ? (
					<Alert sx={{ width: { md: '20%', sm: '90%' }, m: 'auto', fontSize: '1.3rem' }}>
						No orders 😔
					</Alert>
				) : (
					<TableContainer>
						<Table
							sx={{
								width: { md: '80%', sm: '100%' },
								whiteSpace: 'nowrap',
								m: 'auto',
							}}>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>DATE</TableCell>
									<TableCell>TOTAL</TableCell>
									<TableCell>PAID</TableCell>
									<TableCell>ACTION</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orders.map((order: any) => (
									<TableRow key={order._id}>
										<TableCell>{order._id}</TableCell>
										<TableCell>{order.createdAt}</TableCell>
										<TableCell>$ {order.totalPrice}</TableCell>
										<TableCell>
											{order.isPaid ? `Paid on: ${order.paidAt}` : 'not paid'}
										</TableCell>
										<TableCell>
											<Link href={`/order/${order._id}`} passHref>
												<Button variant="contained">Details</Button>
											</Link>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Grid>
		</Box>
	);
}

export default dynamic(() => Promise.resolve(OrderHistoryScreen), {
	ssr: false,
});
