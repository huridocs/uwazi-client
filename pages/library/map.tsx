import React from 'react';
import { LibraryLayout } from '../../modules/library/LibraryLayout';

const getServerSideProps = async context => {
  const searchResults = api.search(context.query);
  return { props: { searchResults: searchResults } };
};

const Map = ({ searchResults }) => (
  <LibraryLayout>
    <div className="map">{searchResults}</div>
  </LibraryLayout>
);
export { getServerSideProps };
export default Map;
