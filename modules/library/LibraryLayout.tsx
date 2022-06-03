import React, { ReactElement } from 'react';
import { Filters } from './Filters';
import { SearchBar } from './SearchBar';

const LibraryLayout = ({ children }: { children: ReactElement }) => (
  <>
    <Filters />
    <SearchBar />
    {children}
  </>
);

export { LibraryLayout };
