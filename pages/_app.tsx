import React from 'react';
import '../styles/globals.css';
import { AppPropsWithLayout } from '../types/global';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page);
  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
