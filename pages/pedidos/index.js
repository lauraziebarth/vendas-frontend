import Layout from '../../layouts/admin/layout';
import Header from '../../components/header';
import Button from '../../components/button';
import TableOrders from '../../components/table-orders';

import { useRouter } from 'next/router';

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pedidos`);
  const data = await res.json();
  const dataDesc = data.sort((a, b) => b.id - a.id);
  // Pass data to the page via props
  return { props: { data: dataDesc } };
}

function Orders({ data = [] }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/pedidos/pedido');
  };

  return (
    <Layout>
      <Header title="Pedidos">
        <Button title="Criar Pedido" onClick={handleClick} />
      </Header>

      <TableOrders list={data} />
    </Layout>
  );
}

export default Orders;
