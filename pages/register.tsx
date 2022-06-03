// @ts-nocheck
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Button,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';

import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, Controller } from 'react-hook-form';
import jsCookie from 'js-cookie';
import { Store } from '../utils/store';
import { getError } from '../utils/error';
import toast from 'react-hot-toast';
import InputMask from 'react-input-mask';
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

const RegisterScreen = () => {
	const router = useRouter();

	const { state, dispatch } = useContext(Store);
	const { userInfo } = state;

	useEffect(() => {
		if (userInfo) {
			router.push('/');
		}
	}, [router, userInfo]);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();
	const [verified, setVerified] = useState(false);

	const [values, setValues] = useState({ amount: '', password: '', showPassword: false });

	const submitHandler = async ({
		email,
		password,
		firstName,
		lastName,
		phone,
		country,
		address,
		addressCont,
		state,
		city,
		postalCode,
	}: RegisterProps) => {
		try {
			const { data } = await axios.post('/api/users/register', {
				email,
				password,
				firstName,
				lastName,
				phone,
				country,
				address,
				addressCont,
				state,
				city,
				postalCode,
			});
			dispatch({ type: 'USER_REGISTER', payload: data });
			jsCookie.set('userInfo', JSON.stringify(data));
			router.push('/');
		} catch (error: any) {
			toast(getError(error));
		}
	};

	// const handleChange = (prop: string) => (event: any) => {
	// 	setValues({ ...values, [prop]: event.target.value });
	// };

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event: any) => {
		event.preventDefault();
	};

	return (
		<Box mb={'auto'}>
			<Head>
				<title>Register - Atalanta A.C.</title>
			</Head>
			<Grid
				container
				maxWidth="lg"
				m="auto"
				sx={{ backgroundColor: '#fffcf7', pl: 5, pt: 5 }}>
				<Typography variant="h5" gutterBottom>
					Create An Account
				</Typography>
			</Grid>

			<Grid
				container
				maxWidth="lg"
				sx={{
					p: 2,
					minHeight: 1000,
					ml: 'auto',
					mr: 'auto',
					backgroundColor: '#fffcf7',
				}}>
				{/* Login Information */}
				<Grid
					item
					md={6}
					sm={12}
					xs={12}
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
					pr={3}
					pl={3}>
					<FormControl fullWidth>
						<form onSubmit={handleSubmit(submitHandler)}>
							<Typography sx={{ mt: 4 }}>Login Information</Typography>
							<Divider sx={{ mb: 4, justifySelf: 'center' }} />
							{/* Email */}
							<Controller
								name="email"
								defaultValue=""
								control={control}
								rules={{
									required: true,
									pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
								}}
								render={({ field }) => (
									<TextField
										sx={{
											mb: 2.5,
											'& .MuiInput-input': {
												width: 500,
											},
											'& 	.Mui-focused': {
												width: '500 !important',
											},
											'& 	.MuiInput-root': {
												width: 500,
											},
										}}
										className="register"
										required
										id="email"
										label="Email"
										inputProps={{ type: 'email' }}
										error={Boolean(errors.email)}
										helperText={
											errors.email
												? errors.email.type === 'pattern'
													? 'Invalid Email'
													: 'Email Required'
												: ''
										}
										{...field}
									/>
								)}
							/>
							{/* Password */}
							<Controller
								name="password"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 6,
								}}
								render={({ field }) => (
									<TextField
										disabled={userInfo}
										sx={{ mb: 2.5 }}
										className="register"
										required
										id="password"
										label="Password"
										type={values.showPassword ? 'text' : 'password'}
										autoComplete="current-password"
										// onChange={handleChange('password')}
										error={Boolean(errors.password)}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}>
														{values.showPassword ? (
															<Visibility />
														) : (
															<VisibilityOff />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
										helperText={
											errors.password
												? errors.password.type === 'minLength'
													? 'Password Too Short'
													: 'Password Required'
												: ''
										}
										{...field}
									/>
								)}
							/>
							<Typography sx={{ mt: 4 }}>Personal Information</Typography>
							<Divider sx={{ mb: 4, justifySelf: 'center' }} />
							{/* First Name */}
							<Controller
								name="firstName"
								defaultValue=""
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
								defaultValue=""
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
							{/* Telephone */}
							<Controller
								name="phone"
								defaultValue=""
								control={control}
								rules={{
									required: true,
									minLength: 8,
								}}
								render={({ field: { onChange, value } }) => (
									<InputMask
										mask="(999)999-9999"
										value={value}
										onChange={onChange}>
										{(inputProps) => {
											return (
												<TextField
													sx={{ mb: 2.5 }}
													className="register"
													required
													id="phone"
													label="Phone"
													inputProps={{ type: 'tel' }}
													error={Boolean(errors.phone)}
													helperText={
														errors.phone
															? errors.phone.type === 'minLength'
																? 'Invalid Telephone'
																: 'Telephone Required'
															: ''
													}
													{...inputProps}
												/>
											);
										}}
									</InputMask>
								)}
							/>
						</form>
					</FormControl>
				</Grid>

				{/* Billing Info */}
				<Grid
					item
					md={6}
					sm={12}
					xs={12}
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
					pr={3}
					pl={3}>
					<FormControl fullWidth>
						<form onSubmit={handleSubmit(submitHandler)}>
							<Typography sx={{ mt: 4, ml: 3, mr: 3 }}>
								Billing Information
							</Typography>
							<Divider sx={{ mb: 4, ml: 3, mr: 3, justifySelf: 'center' }} />

							{/* Country */}
							<Controller
								name="country"
								defaultValue=""
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
								defaultValue=""
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
								defaultValue={' '}
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
								defaultValue=""
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
									defaultValue=""
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
									defaultValue=""
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
											id="postalCode"
											label="Postal Code"
											inputProps={{ type: 'number' }}
											error={Boolean(errors.postalCode)}
											helperText={
												errors.postalCode
													? errors.postalCode.type === 'minLength'
														? 'Invalid Postal Code'
														: 'First Postal Code Required'
													: ''
											}
											{...field}
										/>
									)}
								/>
							</Box>

							<Box
								className="register"
								display={'flex'}
								mb={2.5}
								justifyContent={'center'}>
								<ReCAPTCHA
									badge="inline"
									sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
									onChange={() => setVerified(true)}
								/>
							</Box>

							<Button
								type="submit"
								disabled={verified === false}
								className="register"
								// onClick={() => router.push('/account')}
								variant="contained"
								sx={{ width: '75%', backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Create Account
							</Button>
						</form>
					</FormControl>
				</Grid>
			</Grid>
		</Box>
	);
};

export default RegisterScreen;
