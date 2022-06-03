import {
	Button,
	Divider,
	FormControl,
	FormControlLabel,
	Grid,
	List,
	ListItem,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CheckoutWizard from '../components/CheckoutWizard';

import { Store } from '../utils/store';

const PaymentScreen = () => {
	const router = useRouter();
	const [paymentMethod, setPaymentMethod] = useState('');
	const { state, dispatch } = useContext(Store);

	const {
		cart: { shippingAddress },
	} = state;

	useEffect(() => {
		if (!shippingAddress.address) {
			router.push('/shipping');
		} else {
			setPaymentMethod(Cookies.get('paymentMethod') || '');
		}
	}, [router, shippingAddress]);

	const submitHandler = (e: any) => {
		e.preventDefault();
		if (!paymentMethod) {
			toast('Payment method is required');
		} else {
			dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
			Cookies.set('paymentMethod', paymentMethod);
			router.push('/placeorder');
		}
	};

	return (
		<Box
			maxWidth="lg"
			sx={{
				p: 2,
				minHeight: '43.75rem',
				m: 'auto',
				mt: 10,
				ml: 'auto',
				mr: 'auto',
				backgroundColor: '#fffcf7',
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
			}}>
			<Head>
				<title>Payment - Atalanta A.C.</title>
			</Head>
			<Box mt={10}>
				<CheckoutWizard activeStep={2} />
			</Box>

			<Grid item md={12} sm={12} xs={12} sx={{ width: { md: '70%', xs: '100%' } }} m={'auto'}>
				<Typography sx={{ mt: 4 }}>Payment Method</Typography>
				<Divider sx={{ mb: 4, justifySelf: 'center' }} />
				<form onSubmit={submitHandler}>
					<List>
						<ListItem>
							<FormControl component="fieldset">
								<RadioGroup
									aria-label="Payment Method"
									name="paymentMethod"
									value={paymentMethod}
									onChange={(e) => setPaymentMethod(e.target.value)}>
									<FormControlLabel
										label="PayPal"
										value="PayPal"
										control={<Radio />}
									/>
									<FormControlLabel
										label="Stripe"
										value="Stripe"
										control={<Radio />}
									/>
								</RadioGroup>
							</FormControl>
						</ListItem>
						<ListItem>
							<Button
								fullWidth
								type="submit"
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Continue
							</Button>
						</ListItem>
						<ListItem>
							<Button
								fullWidth
								onClick={() => router.push('/shipping')}
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Go Back
							</Button>
						</ListItem>
					</List>
				</form>
			</Grid>
		</Box>
	);
};

export default PaymentScreen;
