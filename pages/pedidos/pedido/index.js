import { useState } from 'react'
import Select from 'react-select'

import Layout from "../../../layouts/admin/layout"
import Header from "../../../components/header"
import Button from "../../../components/button"
import Tooltip from "../../../components/tooltip"
import Excluir from "../../../assets/svg/excluir.svg"



export async function getServerSideProps() {
    const resClient = await fetch(`http://127.0.0.1:8000/clientes/`)
    const dataClient = await resClient.json()
    const formatDataClient = dataClient.map(item => ({
        value: item.id,
        label: item.nome
    }))

    const resProduct = await fetch(`http://127.0.0.1:8000/produtos/`)
    const dataProduct = await resProduct.json()
    const formatDataProduct = dataProduct.map(item => ({
        value: item.id,
        label: item.nome,
        multiple: item.multiplo,
        price: item.preco_tabela
    }))
return { props: { dataClient:formatDataClient, dataProduct:formatDataProduct } }
}

function CreateOrder({dataClient=[], dataProduct=[]}) {
    const [client, setClient] = useState(null)
    const [itens, setItens] = useState([])
    const [condicaoPagamento, setCondicaoPagamento] = useState('')
    const [search, setSearch] = useState('')

    const handleClient = (e) => {
        setClient(e)
    }

    const handleItens = (e) => {
        setSearch('')
        setItens([...itens, {...e, id:itens.length+1}])
    }
    
    const onChangePriceItem = (e, index) => {
        const newItens = [...itens];
        newItens[index].liquidityPrice = e.target.value;
        setItens(newItens)
    }

    const onChangeQuantityItem = (e, index) => {
        const newItens = [...itens];
        newItens[index].quantity = e.target.value;
        setItens(newItens)
    }

    const handleItemQuantity = (e) => {
        setItemQuantity(e.target.value)
    }

    const handleRemoveItem = (id) => {
        const newItens = itens.filter((item) => (item.id!==id))
        setItens(newItens)
    }

    const handlePayment = (e) => {
        setCondicaoPagamento(e.target.value)
    }

    const handleSubmit = async() => {
        const newItens = itens.map(item => ({
            produto_id: item.value,
            produto_nome: item.label,
            produto_multiplo: item.multiple,
            produto_preco_tabela: item.price,
            quantidade: item.quantity,
            preco_liquido: item.liquidityPrice
        }))
        const data = {
            cliente: client.value,
            cliente_nome: client.label,
            condicao_pagamento: condicaoPagamento,
            total: 100.00,
            itens: newItens
        }

        const res = await fetch(
            'http://localhost:8000/pedidos/',
            {
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }
        )
    }

    return (
            <Layout>
                <Header title="Criar Pedido">
                </Header>
                
                <form className='order-form'>
                    <div className='order-form-container-input'>
                        <label>
                            Cliente:
                            <Select
                                value={client}
                                onChange={handleClient}
                                options={dataClient}
                            />
                        </label>
                    </div>

                    <div className='order-form-container-input'>
                        <label>
                            Produtos:
                            <Select
                                value={search}
                                onChange={handleItens}
                                options={dataProduct}
                            />
                        </label>
                    </div>
                    {itens.map((item, index) => (
                        <div key={item.id} className='order-form-attributes'>
                            <div className='order-form-container'>
                                <label>
                                    Nome: {item.label}
                                </label>
                            </div>
                            <div className='order-form-container'>
                                <label>
                                    Preço Tabela: {item.price}
                                </label>
                            </div>
                            <div className='order-form-container-input'>
                                <label>
                                    Qtd: 
                                    <input type="number" name="quantity" value={item.quantity} onChange={(e) => {onChangeQuantityItem(e, index)}}/>
                                </label>
                            </div>
                            <div className='order-form-container-input'>
                                <label>
                                    Preço Líquido: 
                                    <input type="number" name="price" value={item.liquidityPrice} onChange={(e) => {onChangePriceItem(e, index)}}/>
                                </label>
                            </div>
                            <div className='order-form-container-input'>
                                <Tooltip title="excluir">
                                    <button type="button" className="remove-item" onClick={() => {handleRemoveItem(item.id)}}><Excluir/></button>
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                    

                    <br/>
                    <br/>
                    <br/>
                    <div className='order-form-container-input'>
                        <label>
                            Condição de pagamento:
                            <input type="text" name="payment" value={condicaoPagamento} onChange={handlePayment} />
                        </label>
                    </div>
                </form>

                <Button title="Salvar" onClick={handleSubmit}/>

                <style jsx>
                {`
                .order-form{
                    margin: 50px;
                }
                .select-client{
                    display: flex;
                    padding: 3px 8px;
                    margin: 10px 0;
                    width: 500px;
                    border: 1px solid #f2f2f2;
                    border-radius: 4px;
                    font-size: 15px;
                }
                option{
                    background-color: red;
                }
                .order-form-container-input{
                    margin-bottom: 15px;
                }
                .order-form-attributes{
                    display: flex;
                    flex-direction: row;
                    font-size: 13px;
                }
                .order-form-attributes input{
                    max-width: 55px;
                }
                `}
            </style>

            </Layout>
    ) 
  }
  
  export default CreateOrder