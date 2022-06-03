// @ts-nocheck
import { useContext, useEffect, useState } from 'react';
import {
	Button,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Store } from '../utils/store';
import InputMask from 'react-input-mask';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import jsCookie from 'js-cookie';
import axios from 'axios';
import { getError } from '../utils/error';
import Head from 'next/head';

function AccountScreen() {
	const [edit, setEdit] = useState(false);

	const { state, dispatch } = useContext(Store);
	const { userInfo } = state;
	const router = useRouter();

	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm();

	// Password Handler
	const [values, setValues] = useState({ amount: '', password: '', showPassword: false });
	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};
	const handleMouseDownPassword = (event: any) => {
		event.preventDefault();
	};

	// Submit
	const submitHandler = async ({
		firstName,
		lastName,
		email,
		password,
		confirmPassword,
		telephone,
		country,
		address,
		addressCont,
		state,
		city,
		postalCode,
	}: any) => {
		if (password !== confirmPassword) {
			toast(`Passwords Don't Match`);
			return;
		}
		try {
			const { data } = await axios.put(
				'/api/users/profile',
				{
					firstName,
					lastName,
					email,
					password,
					telephone,
					country,
					address,
					addressCont,
					state,
					city,
					postalCode,
				},
				{ headers: { authorization: `Bearer ${userInfo.token}` } }
			);
			dispatch({ type: 'USER_REGISTER', payload: data });
			jsCookie.set('userInfo', JSON.stringify(data));
			setEdit(!edit);
			toast('Profile Updated');
		} catch (err) {
			toast(getError(err));
		}
	};

	// @ts-ignore: Unreachable code error
	useEffect(() => {
		if (!userInfo) {
			return router.push('/register');
		}
		setValue('firstName', userInfo.firstName);
		setValue('lastName', userInfo.lastName);
		setValue('email', userInfo.email);
		setValue('telephone', userInfo.telephone);
		setValue('country', userInfo.country);
		setValue('address', userInfo.address);
		setValue('addressCont', userInfo?.addressCont);
		setValue('state', userInfo.state);
		setValue('city', userInfo.city);
		setValue('postalCode', userInfo.postalCode);
	}, [router, setValue, userInfo]);

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
				<title>Account - Atalanta A.C.</title>
			</Head>
			<Grid item md={12} sm={12} xs={12} sx={{ width: { md: '70%', sm: '90%' } }} m={'auto'}>
				<form onSubmit={handleSubmit(submitHandler)}>
					<Box display={'flex'} justifyContent="space-between">
						<Typography sx={{ mt: 4 }}>Shipping Address</Typography>{' '}
						<Button onClick={() => setEdit(!edit)}>
							<Typography sx={{ mt: 3 }}>Edit</Typography>
						</Button>
					</Box>
					<Divider sx={{ mb: 4, justifySelf: 'center' }} />
					{/* First Name */}
					<Controller
						defaultValue=""
						name="firstName"
						// defaultValue={userInfo.firstName}
						control={control}
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								disabled={!edit}
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
						// defaultValue={userInfo.lastName}
						control={control}
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								disabled={!edit}
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
								disabled={!edit}
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
						defaultValue="*************"
						// defaultValue={userInfo.password}
						rules={{
							validate: (value) =>
								value === '' ||
								value.length > 5 ||
								'Password length is greater than 5',
						}}
						render={({ field }) => (
							<TextField
								disabled={!edit}
								// disabled={userInfo}
								sx={{ mb: 2.5 }}
								className="register"
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
									errors.password ? 'Password length is greater than 5' : ''
								}
								{...field}
							/>
						)}
					/>
					{/*Confirm Password */}
					<Controller
						name="confirmPassword"
						control={control}
						defaultValue="*************"
						// defaultValue={userInfo.password}
						rules={{
							validate: (value) =>
								value === '' ||
								value.length > 5 ||
								'Password length is greater than 5',
						}}
						render={({ field }) => (
							<TextField
								disabled={!edit}
								// disabled={userInfo}
								sx={{ mb: 2.5 }}
								className="register"
								id="confirmPassword"
								label="Confirm Password"
								type={values.showPassword ? 'text' : 'password'}
								autoComplete="current-password"
								// onChange={handleChange('password')}
								error={Boolean(errors.confirmPassword)}
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
									errors.confirmPassword
										? 'Password length is greater than 5'
										: ''
								}
								{...field}
							/>
						)}
					/>
					{/* Telephone */}
					<Controller
						name="telephone"
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
								onChange={onChange}
								disabled={!edit}>
								{(inputProps) => {
									return (
										<TextField
											disabled={!edit}
											sx={{ mb: 2.5 }}
											className="register"
											required
											id="telephone"
											label="Phone"
											inputProps={{ type: 'tel' }}
											error={Boolean(errors.phone)}
											helperText={
												errors.telephone
													? errors.telephone.type === 'minLength'
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
					{/* Country */}
					<Controller
						name="country"
						defaultValue=""
						// defaultValue={userInfo.country}
						control={control}
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								disabled={!edit}
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
						// defaultValue={userInfo.address}
						control={control}
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								disabled={!edit}
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
						defaultValue=""
						// defaultValue={userInfo?.addressCont}
						control={control}
						rules={{
							required: false,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								disabled={!edit}
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
						// defaultValue={userInfo.state}
						control={control}
						rules={{
							required: true,
							minLength: 2,
						}}
						render={({ field }) => (
							<TextField
								disabled={!edit}
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
						{/* City */}
						<Controller
							name="city"
							defaultValue=""
							// defaultValue={userInfo.city}
							control={control}
							rules={{
								required: true,
								minLength: 2,
							}}
							render={({ field }) => (
								<TextField
									disabled={!edit}
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
							// defaultValue={userInfo.postalCode}
							control={control}
							rules={{
								required: true,
								minLength: 2,
								pattern: /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/,
							}}
							render={({ field }) => (
								<TextField
									disabled={!edit}
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
						disabled={!edit}
						fullWidth
						type="submit"
						variant="contained"
						sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
						Update
					</Button>
				</form>
			</Grid>
		</Box>
	);
}

export default dynamic(() => Promise.resolve(AccountScreen), {
	ssr: false,
});
