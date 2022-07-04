import React, { ReactElement } from 'react';
import { Filters } from './Filters';
import { SearchBar } from './SearchBar';

const LibraryLayout = ({ children }: { children: ReactElement }) => (
  <div className="uwazi-container flex">
    <Filters />
    <main className="">
      <SearchBar />
      {children}
    </main>
  </div>
);

export { LibraryLayout };
