import React from 'react';
import useSWR from 'swr';
import { Layout } from '../components/layout/Layout';
import { apiFetcher } from '../services/apiFetcher';
import { AppPropsWithLayout } from '../types/global';
import '../styles/globals.css';
import { get } from '../services/apiClient';

// DOES NOT WORK on account that the function is only exportable on pages

const getServerSideProps = async () => {
  const templates = await get('templates');

  return {
    props: {
      fallback: {
        templates: templates,
      },
    },
  };
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { templates } = useSWR('templates', apiFetcher);

  //or save the templates to an atom?

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export { getServerSideProps };
export default MyApp;
