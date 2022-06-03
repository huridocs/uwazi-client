import React from 'react';
import { LibraryLayout } from 'modules/library/LibraryLayout';
import { search } from 'services/search';
import { InferGetServerSidePropsType } from 'next';

const getServerSideProps = async () => {
  const {rows: searchResults } = await  search();
  return { props: { searchResults: searchResults } };
};

const Map = ({ searchResults }: InferGetServerSidePropsType<typeof getServerSideProps>) => (<LibraryLayout>
    <div className="map">
      <h1>Map</h1>
      {searchResults.map(result => <div key={result._id}>{ result.title }</div>)}
      </div>
  </LibraryLayout>);

export { getServerSideProps };
export default Map;
