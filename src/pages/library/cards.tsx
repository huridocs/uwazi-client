import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import { LibraryLayout } from 'modules/library/LibraryLayout';
import { search } from 'services/search';
import { Card } from 'modules/card/Card';

const getServerSideProps = async () => {
  const { rows: entities } = await search();
  return { props: { entities } };
};

const Cards = ({ entities }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <LibraryLayout>
    <>
      <section className="cards grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {entities.map(entity => (
          <Card entity={entity} key={entity._id} />
        ))}
      </section>
    </>
  </LibraryLayout>
);

export { getServerSideProps };
export default Cards;
