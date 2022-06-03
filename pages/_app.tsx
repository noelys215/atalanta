// @ts-nocheck
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import TopBar from '../components/TopBar';
import Copyright from '../components/Copyright';
import '../styles/globals.css';
import { Box } from '@mui/material';
import { StoreProvider } from '../utils/store';
import { Toaster } from 'react-hot-toast';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
	const [showChild, setShowChild] = React.useState(false);
	React.useEffect(() => {
		setShowChild(true);
	}, []);

	if (!showChild) {
		return null;
	}

	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	if (typeof window === 'undefined') {
		return <></>;
	} else {
		return (
			<CacheProvider value={emotionCache}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						height: '100vh',
					}}>
					<Head>
						<title>Atatanta A.C.</title>
						<meta name="viewport" content="initial-scale=1, width=device-width" />
					</Head>
					<ThemeProvider theme={theme}>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<StoreProvider>
							<Toaster
								position="bottom-center"
								gutter={8}
								toastOptions={{
									duration: 5000,
									style: {
										background: '#363636',
										color: '#fff',
									},
								}}
							/>
							<TopBar />
							<PayPalScriptProvider deferLoading={true}>
								<Component {...pageProps} />
							</PayPalScriptProvider>
						</StoreProvider>
						<Copyright />
					</ThemeProvider>
				</Box>
			</CacheProvider>
		);
	}
}
