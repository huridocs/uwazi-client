import React from 'react';
import { LibraryLayout } from 'modules/library/LibraryLayout';
import { search } from 'services/search';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { rows: entities } = await search(context.req.headers.host || '');
  return { props: { entities } };
};

const Table = ({ entities }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <LibraryLayout>
    <div className="table">
      <h1>Table</h1>
      {entities.map(entity => (
        <div key={entity._id}>{entity.title}</div>
      ))}
    </div>
  </LibraryLayout>
);

export { getServerSideProps };
export default Table;
