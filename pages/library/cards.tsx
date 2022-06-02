import React from 'react';
import { LibraryLayout } from 'modules/library/LibraryLayout';
import { search } from 'services/search';

const getServerSideProps = async context => {
  const {rows: searchResults } = await  search();
  return { props: { searchResults: searchResults } };
};

const Cards = ({ searchResults }) => (<LibraryLayout>
    <div className="cards">{searchResults.map(result => <div key={result._id}>{ result.title }</div>)}</div>
  </LibraryLayout>);

export { getServerSideProps };
export default Cards;
