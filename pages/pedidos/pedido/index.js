import { useState } from 'react'
import Select from 'react-select'

import Layout from "../../../layouts/admin/layout"
import Header from "../../../components/header"
import Button from "../../../components/button"
import Tooltip from "../../../components/tooltip"
import Rentability from "../../../components/rentability"
import Excluir from "../../../assets/svg/excluir.svg"
import { validateItensOrder } from "../../../utils/validation"


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
        price: item.preco_tabela,
        rentability: ''
    }))
return { props: { dataClient:formatDataClient, dataProduct:formatDataProduct } }
}

function CreateOrder({dataClient=[], dataProduct=[]}) {
    const [client, setClient] = useState(null)
    const [itens, setItens] = useState([])
    const [condicaoPagamento, setCondicaoPagamento] = useState('')
    const [search, setSearch] = useState('')
    const isDisabled = validateItensOrder(itens)

    const handleClient = (e) => {
        setClient(e)
    }

    const handleItens = (e) => {
        setSearch('')
        setItens([...itens, {...e, id:itens.length+1, errors: {quantity: '', liquidityPrice: ''}}])
    }
    
    const onChangePriceItem = (e, index, price) => {
        const newItens = [...itens]
        const liquidityPrice = e.target.value
        const newLiquidityPrice = liquidityPrice ? parseFloat(liquidityPrice) : ''
        const newPrice = parseFloat(price)
        newItens[index].liquidityPrice = newLiquidityPrice
        const errors = newItens[index].errors
        errors["liquidityPrice"] = ''

        const great = newLiquidityPrice > newPrice
        const good = newLiquidityPrice >= (newPrice * 0.9)
        const bad = newLiquidityPrice < (newPrice * 0.9)

        if (bad) {
            errors["liquidityPrice"] = `Ruim`
            newItens[index].rentability = 'bad'
        }
        if (good) {
            newItens[index].rentability = 'good'
        }
        if (great) {
            newItens[index].rentability = 'great'

        }
        if (newLiquidityPrice === '') {
            errors["liquidityPrice"] = ''
        }
        setItens(newItens)
    }

    const onChangeQuantityItem = (e, index) => {
        const newItens = [...itens]
        const quantity = e.target.value
        const multiple = newItens[index].multiple
        newItens[index].quantity = quantity
        const errors = newItens[index].errors
        errors["quantity"] = ''

        if (quantity % multiple !== 0 && multiple !== null){
            errors["quantity"] = `Produto multiplo de ${multiple}`
        } 
        if (quantity <= 0) {
            errors["quantity"] = `Quantidade deve ser maior que 0`
        }
        setItens(newItens)
    }

    const handleRemoveItem = (id) => {
        const newItens = itens.filter((item) => (item.id!==id))
        setItens(newItens)
    }

    const handlePayment = (e) => {
        setCondicaoPagamento(e.target.value)
    }

    const handleSubmit = async() => {
        console.log(itens)
        const newItens = itens.map(item => ({
            produto_id: item.value,
            produto_nome: item.label,
            produto_multiplo: parseFloat(item.multiple),
            produto_preco_tabela: item.price,
            quantidade: item.quantity,
            preco_liquido: item.liquidityPrice,
            rentabilidade: item.rentability
        }))
        console.log(newItens)
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
                        </label>
                            <Select
                                value={client}
                                onChange={handleClient}
                                options={dataClient}
                                placeholder="Selecione o cliente..."
                            />
                    </div>

                    <div className='order-form-container-input'>
                        <label>
                            Produtos:
                        </label>
                            <Select
                                value={search}
                                onChange={handleItens}
                                options={dataProduct}
                                placeholder="Selecione os produtos..."
                            />
                    </div>
                    {itens.map((item, index) => (
                        <div key={item.id} className='order-form-attributes order-form-container-input'>
                            <div className='order-form-attributes-input'>
                                <label>
                                    Nome:
                                </label>
                                <span>
                                    {item.label}
                                </span>
                            </div>
                            <div className='order-form-attributes-input'>
                                <label>
                                    Preço Tabela: 
                                </label>
                                <span>
                                    {item.price}
                                </span>
                            </div>
                            <div className='order-form-attributes-input'>
                                <label htmlFor="quantity">
                                    Qtd:
                                </label>
                                <input id="quantity" type="number" name="quantity" value={item.quantity} onChange={(e) => {onChangeQuantityItem(e, index)}}/>
                                {item.quantity && (<span className="errors">{item.errors.quantity}</span>)}
                            </div>
                            <div className='order-form-attributes-input'>
                                <label htmlFor="price">
                                    Preço Líquido:
                                </label>
                                <div className="price">
                                    R$ <input id="price" type="number" name="price" value={item.liquidityPrice} onChange={(e) => {onChangePriceItem(e, index, item.price)}}/>
                                    {item.liquidityPrice !== '' && (<Rentability type={item.rentability}>{item.errors.liquidityPrice}</Rentability>)}
                                </div>
                            </div>
                            <div className='order-form-attributes-input'>
                                <Tooltip title="excluir">
                                    <button type="button" className="remove-item" onClick={() => {handleRemoveItem(item.id)}}><Excluir/></button>
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                    
                    <div className='payment'>
                        <label>
                            Condição de pagamento:
                        </label>
                            <input type="text" name="payment" value={condicaoPagamento} onChange={handlePayment} />
                    </div>
                </form>

                <Button title="Criar Pedido" onClick={handleSubmit} disabled={isDisabled}/>

                <style jsx>
                {`
                .order-form{
                    margin: 50px;
                }
                option{
                    background-color: red;
                }
                .order-form-container-input{
                    margin-bottom: 20px;
                }
                .order-form-attributes{
                    display: flex;
                    flex-direction: row;
                    font-size: 15px;
                    border-bottom: 1px solid #cccccc;
                    align-items: center;
                    padding: 10px 5px;
                    justify-content: space-between;
                }
                input{
                    border: 1px solid #cccccc;
                    min-height: 30px;
                    max-width: 200px;
                    border-radius: 4px;
                }
                .order-form-attributes input{
                    max-width: 80px;
                    margin: 0 3px;
                }
                label{
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                .remove-item{
                    border: 1px solid #cccccc;
                    background-color: transparent;
                    border-radius: 4px;
                }
                .payment{
                    margin-top: 80px;
                }
                .price{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                .errors{
                    display: block;
                    font-size: 13px;
                    margin-top: 5px;
                    color: red;
                    max-width: 80px;
                }
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance:textfield; /* Firefox */
                }
                `}
            </style>

            </Layout>
    ) 
  }
  
  export default CreateOrder