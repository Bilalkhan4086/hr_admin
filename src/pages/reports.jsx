import { Helmet } from 'react-helmet-async';

import { ReportsView } from 'src/sections/reports/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Admin Panel </title>
      </Helmet>

      <ReportsView />
    </>
  );
}
