import { layoutNames } from 'common/constansts';
import React from 'react';
import { AuthenticatedLayout } from './layouts';

type LayoutProps = {
  layout?: layoutNames;
};

const Layout: React.FC<LayoutProps> = ({ layout, children }) => {
  if (layout === layoutNames.authenticated) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
  }
  return <>{children}</>;
};

export default Layout;
