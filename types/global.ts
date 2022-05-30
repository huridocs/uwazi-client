import { AppProps } from 'next/app';
import { NextPage } from 'next/types';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type { NextPageWithLayout, AppPropsWithLayout };
