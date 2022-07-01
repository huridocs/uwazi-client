import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { LibraryLayout } from 'modules/library/LibraryLayout';
import { search } from 'services/search';
import { Card } from 'modules/card/Card';

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { rows: entities } = await search(context.req.headers.host || '');
  return { props: { entities } };
};

const Cards = ({ entities }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <LibraryLayout>
    <>
      <h1 className="text-3xl font-bold underline">Cards</h1>
      <section className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {entities.map(entity => (
          <Card entity={entity} key={entity._id} />
        ))}
      </section>
    </>
  </LibraryLayout>
);

export { getServerSideProps };
export default Cards;
