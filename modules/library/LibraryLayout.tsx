import React from 'react';
import { Filters } from './Filters';
import { SearchBar } from './SearchBar';

const LibraryLayout = props => (
  <>
    <Filters />
    <SearchBar />
    {props.children}
  </>
);

export { LibraryLayout };
