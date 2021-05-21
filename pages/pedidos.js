import Layout from "../layouts/admin/layout"
import Header from "../components/header"
import Button from "../components/button"
import TableOrders from "../components/table-orders"

function Orders() {
    const orders = [{id:1, numero:"1", cliente_nome: "Laura", total:59.00, rentabilidade:"boa"},
                    {id:2, numero:"2", cliente_nome: "Murillo", total:69.00, rentabilidade:"ruim"}, 
                    {id:3, numero:"3", cliente_nome: "Alice", total:79.00, rentabilidade:"normal"}]

    return (
            <Layout>
                <Header title="Pedidos">
                    <Button title="Criar Pedido"/>
                </Header>

                <TableOrders list={orders}/>
            </Layout>
    ) 
  }
  
  export default Orders