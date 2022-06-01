import React from 'react';
import { Filters } from './Filters';
import { SearchBar } from './SearchBar';

const LibraryLayout = children => (
  <>
    <Filters />
    <SearchBar />
    {children}
  </>
);

export { LibraryLayout };
