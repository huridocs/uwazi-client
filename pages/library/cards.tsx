import React from 'react';
import { LibraryLayout } from '../../modules/library/LibraryLayout';

const getServerSideProps = async context => {
  const searchResults = api.search(context.query);
  return { props: { searchResults: searchResults } };
};

const Cards = ({ searchResults }) => (
  <LibraryLayout>
    <div className="cards">{searchResults}</div>
  </LibraryLayout>
);

export { getServerSideProps };
export default Cards;
