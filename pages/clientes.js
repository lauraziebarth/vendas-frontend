import { useState, useEffect } from 'react';

import Layout from '../layouts/admin/layout';
import Header from '../components/header';
import Table from '../components/table';

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}clientes/`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

function Clients({ data = [] }) {
  return (
    <Layout>
      <Header title="Clientes" /> <Table list={data} />{' '}
    </Layout>
  );
}

export default Clients;
