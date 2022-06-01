import React from 'react';
import { LibraryLayout } from '../../modules/library/LibraryLayout';

const getServerSideProps = async context => {
  const searchResults = api.search(context.query);
  return { props: { searchResults: searchResults } };
};

const Table = ({ searchResults }) => (
  <LibraryLayout>
    <div className="table">{searchResults}</div>
  </LibraryLayout>
);

export { getServerSideProps };
export default Table;
