import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import i18n from '../next-i18next.config';

export async function getServerSideProps({ locale }) {
  //const result = await serverSideTranslations(locale, ['common']);
  const response = await fetch('http://localhost:3000/api/translations');
  const { rows } = await response.json();

  const localeTranslations = rows.filter(row => row.locale === locale);

  const resources = localeTranslations.reduce((memo, language) => {
    const context = language.contexts.find(ctx => ctx.label === 'related');
    const translations = Object.keys(context.values).reduce(
      (memo, key) => ({
        ...memo,
        [key]: context.values[key],
      }),
      {}
    );

    return {
      ...memo,
      [language.locale]: { [context.id]: translations },
    };
  }, {});

  const source = {
    _nextI18Next: {
      initialI18nStore: {
        ...resources,
      },
      initialLocale: 'en',
      userConfig: {
        ...i18n,
      },
    },
  };

  return {
    props: {
      ...source,
    },
  };
}

const Home: NextPage = () => {
  const { t } = useTranslation('62966466488546159bc362b5');
  return (
    <>
      <Head>
        <title>Uwazi</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">{t('related')}</h1>
    </>
  );
};
export default Home;
