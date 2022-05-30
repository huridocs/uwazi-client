import React, { ReactElement } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

const Layout = ({ children }: { children: ReactElement }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

export { Layout };
