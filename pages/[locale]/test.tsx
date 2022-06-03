import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

const getServerSideProps: GetServerSideProps = async (context) => ({ props: { lang: context.query.locale } });

const Test = ({ lang }:  InferGetServerSidePropsType<typeof getServerSideProps>) => <div>{lang}</div>;

export {getServerSideProps};
export default Test;