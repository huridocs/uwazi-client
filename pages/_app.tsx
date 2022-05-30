import React from 'react';
import { Layout } from '../components/layout/Layout';
import '../styles/globals.css';
import { AppPropsWithLayout } from '../types/global';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
