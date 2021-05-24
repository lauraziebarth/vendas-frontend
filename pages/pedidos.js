import Layout from "../layouts/admin/layout"
import Header from "../components/header"
import Button from "../components/button"
import TableOrders from "../components/table-orders"

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
        const res = await fetch(`http://127.0.0.1:8000/pedidos/`)
        const data = await res.json()
    // Pass data to the page via props
    return { props: { data } }
    }

function Orders({data=[]}) {

    return (
            <Layout>
                <Header title="Pedidos">
                    <Button title="Criar Pedido"/>
                </Header>

                <TableOrders list={data}/>
            </Layout>
    ) 
  }
  
  export default Orders