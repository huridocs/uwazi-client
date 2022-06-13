import React from 'react';
import { LibraryLayout } from 'modules/library/LibraryLayout';
import { search } from 'services/search';
import { InferGetServerSidePropsType } from 'next';

const getServerSideProps = async () => {
  console.log('Getting server side props!');
  const { rows: entities } = await search();
  return { props: { entities } };
};

const Cards = ({ entities }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <LibraryLayout>
    <section className="cards">
      <h1>Cards</h1>
      {entities.map(entity => (
        <article key={entity._id}>
          <h2>{entity.title}</h2>
        </article>
      ))}
    </section>
  </LibraryLayout>
);

export { getServerSideProps };
export default Cards;
