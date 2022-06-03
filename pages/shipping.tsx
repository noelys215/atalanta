import React, { useContext, useEffect } from 'react';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CheckoutWizard from '../components/CheckoutWizard';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Store } from '../utils/store';
import jsCookie from 'js-cookie';
import Head from 'next/head';

interface RegisterProps {
	email?: string[];
	password?: any[];
	firstName?: string;
	lastName?: string;
	phone?: number;
	country?: string;
	address?: string;
	addressCont?: string;
	state?: string;
	city?: string;
	postalCode?: number;
}

export default function ShippingScreen() {
	const { state, dispatch } = useContext(Store);
	const router = useRouter();

	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm();

	const {
		userInfo,
		cart: { shippingAddress },
	} = state;

	// @ts-ignore: Unreachable code error
	useEffect(() => {
		if (!userInfo) {
			return router.push('/register');
		}
		setValue('firstName', shippingAddress.firstName || userInfo.firstName);
		setValue('lastName', shippingAddress.lastName || userInfo.lastName);
		setValue('country', shippingAddress.country || userInfo.country);
		setValue('address', shippingAddress.address || userInfo.address);
		setValue('addressCont', shippingAddress.addressCont || userInfo.addressCont);
		setValue('state', shippingAddress.state || userInfo.state);
		setValue('city', shippingAddress.city || userInfo.city);
		setValue('postalCode', shippingAddress.postalCode || userInfo.postalCode);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router, setValue, userInfo]);

	const submitHandler = ({
		firstName,
		lastName,
		country,
		address,
		addressCont,
		state,
		city,
		postalCode,
	}: RegisterProps) => {
		dispatch({
			type: 'SAVE_SHIPPING_ADDRESS',
			payload: {
				firstName,
				lastName,
				country,
				address,
				addressCont,
				state,
				city,
				postalCode,
			},
		});
		jsCookie.set(
			'shippingAddress',
			JSON.stringify({
				firstName,
				lastName,
				country,
				address,
				addressCont,
				state,
				city,
				postalCode,
			})
		);
		router.push('/payment');
	};

	return (
		<Box
			mb={'auto'}
			maxWidth="lg"
			sx={{
				p: 2,
				minHeight: '62.5rem',
				mt: 10,
				ml: 'auto',
				mr: 'auto',
				backgroundColor: '#fffcf7',
				display: 'flex',
				flexDirection: 'column',
			}}>
			<Head>
				<title>Shipping - Atalanta A.C.</title>
			</Head>
			<Box mt={10}>
				<CheckoutWizard activeStep={1}></CheckoutWizard>
			</Box>
			<Grid item md={12} sm={12} xs={12} sx={{ width: { md: '70%', sm: '90%' } }} m={'auto'}>
				<form onSubmit={handleSubmit(submitHandler)}>
					<Typography sx={{ mt: 4 }}>Shipping Address</Typography>
					<Divider sx={{ mb: 4, justifySelf: 'center' }} />
					{/* First Name */}
					<Controller
						name="firstName"
						defaultValue={userInfo.firstName}
						control={control}
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								sx={{ mb: 2.5 }}
								className="register"
								id="firstName"
								label="First Name"
								inputProps={{ type: 'text' }}
								error={Boolean(errors.firstName)}
								helperText={
									errors.firstName
										? errors.firstName.type === 'minLength'
											? 'Invalid Name'
											: 'First Name Required'
										: ''
								}
								{...field}
							/>
						)}
					/>
					{/* Last Name */}
					<Controller
						name="lastName"
						defaultValue={userInfo.lastName}
						control={control}
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								sx={{ mb: 2.5 }}
								className="register"
								id="lastName"
								label="Last Name"
								inputProps={{ type: 'text' }}
								error={Boolean(errors.lastName)}
								helperText={
									errors.lastName
										? errors.lastName.type === 'minLength'
											? 'Invalid Name'
											: 'Last Name Required'
										: ''
								}
								{...field}
							/>
						)}
					/>
					{/* Country */}
					<Controller
						name="country"
						defaultValue={userInfo.country}
						control={control}
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								sx={{ mb: 2.5 }}
								className="register"
								required
								id="country"
								label="Country"
								inputProps={{ type: 'text' }}
								error={Boolean(errors.country)}
								helperText={
									errors.country
										? errors.country.type === 'minLength'
											? 'Invalid Country'
											: 'First Country Required'
										: ''
								}
								{...field}
							/>
						)}
					/>

					{/* Address */}
					<Controller
						name="address"
						defaultValue={userInfo.address}
						control={control}
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								sx={{ mb: 2.5 }}
								className="register"
								required
								id="address"
								label="Address"
								inputProps={{ type: 'text' }}
								error={Boolean(errors.address)}
								helperText={
									errors.address
										? errors.address.type === 'minLength'
											? 'Invalid Address'
											: 'First Address Required'
										: ''
								}
								{...field}
							/>
						)}
					/>

					{/* Address Cont */}
					<Controller
						name="addressCont"
						defaultValue={userInfo.addressCont}
						control={control}
						rules={{
							required: false,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								sx={{ mb: 2.5 }}
								className="register"
								id="addressCont"
								label="Address Cont.."
								inputProps={{ type: 'text' }}
								error={Boolean(errors.addressCont)}
								helperText={
									errors.addressCont
										? errors.addressCont.type === 'minLength'
											? 'Invalid Address'
											: 'First Address Required'
										: ''
								}
								{...field}
							/>
						)}
					/>

					{/* State */}
					<Controller
						name="state"
						defaultValue={userInfo.state}
						control={control}
						rules={{
							required: true,
							minLength: 2,
						}}
						render={({ field }) => (
							<TextField
								sx={{ mb: 2.5 }}
								className="register"
								required
								id="state"
								label="State"
								inputProps={{ type: 'text' }}
								error={Boolean(errors.state)}
								helperText={
									errors.state
										? errors.state.type === 'minLength'
											? 'Invalid State'
											: 'First State Required'
										: ''
								}
								{...field}
							/>
						)}
					/>

					<Box className="register" display={'flex'} gap={2.5}>
						{/* State */}
						<Controller
							name="city"
							defaultValue={userInfo.city}
							control={control}
							rules={{
								required: true,
								minLength: 2,
							}}
							render={({ field }) => (
								<TextField
									sx={{ mb: 2.5 }}
									className="register"
									required
									id="city"
									label="City"
									inputProps={{ type: 'text' }}
									error={Boolean(errors.city)}
									helperText={
										errors.city
											? errors.city.type === 'minLength'
												? 'Invalid City'
												: 'First City Required'
											: ''
									}
									{...field}
								/>
							)}
						/>

						{/* Zip Code */}
						<Controller
							name="postalCode"
							defaultValue={userInfo.postalCode}
							control={control}
							rules={{
								required: true,
								minLength: 2,
								pattern: /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/,
							}}
							render={({ field }) => (
								<TextField
									sx={{ mb: 2.5 }}
									className="register"
									required
									id="postalCode"
									label="Postal Code"
									inputProps={{ type: 'text' }}
									error={Boolean(errors.postalCode)}
									helperText={
										errors.postalCode
											? errors.postalCode.type === 'pattern'
												? 'Invalid Postal Code'
												: 'First Postal Code Required'
											: ''
									}
									{...field}
								/>
							)}
						/>
					</Box>
					<Button
						fullWidth
						type="submit"
						variant="contained"
						sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
						Continue to payment
					</Button>
				</form>
			</Grid>
		</Box>
	);
}
