import React from 'react';
import Header from './Header';

export const AuthenticatedLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className='mt-32'>{children}</div>
    </>
  );
};
