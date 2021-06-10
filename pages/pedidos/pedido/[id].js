import { useRouter } from 'next/router';

function Order() {
  const router = useRouter();
  const { id } = router.query;

  return <p>Pedido: {id}</p>;
}

export default Order;
