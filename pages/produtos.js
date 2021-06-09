import Layout from "../layouts/admin/layout"
import Header from "../components/header"
import Table from "../components/table"

// This gets called on every request
export async function getServerSideProps() {
// Fetch data from external API
    const res = await fetch(`http://127.0.0.1:8000/produtos/`)
    const data = await res.json()
// Pass data to the page via props
return { props: { data } }
}

function Products({data=[]}) {
    return (
            <Layout>
                <Header title="Produtos"/>

                <Table list={data}/>
            </Layout>
    ) 
  }
  
  export default Products