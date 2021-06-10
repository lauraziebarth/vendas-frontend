import { useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';

import Layout from '../../../layouts/admin/layout';
import Header from '../../../components/header';
import Button from '../../../components/button';
import Tooltip from '../../../components/tooltip';
import Rentability from '../../../components/rentability';
import Excluir from '../../../assets/svg/excluir.svg';
import { validateItensOrder } from '../../../utils/validate';
import { calculateTotalOrder } from '../../../utils/calculate';

export async function getServerSideProps() {
  const resClient = await fetch(`${process.env.NEXT_PUBLIC_API_URL}clientes/`);
  const dataClient = await resClient.json();
  const formatDataClient = dataClient.map((item) => ({
    value: item.id,
    label: item.nome,
  }));

  const resProduct = await fetch(`${process.env.NEXT_PUBLIC_API_URL}produtos/`);
  const dataProduct = await resProduct.json();
  const formatDataProduct = dataProduct.map((item) => ({
    value: item.id,
    label: item.nome,
    multiple: item.multiplo,
    price: item.preco_tabela,
    rentability: '',
    quantity: '',
    liquidityPrice: '',
    total: '',
  }));
  return {
    props: { dataClient: formatDataClient, dataProduct: formatDataProduct },
  };
}

function CreateOrder({ dataClient = [], dataProduct = [] }) {
  const [client, setClient] = useState('');
  const [itens, setItens] = useState([]);
  const [paymentCondition, setPaymentCondition] = useState('');
  const [totalOrder, setTotalOrder] = useState(0);
  const [search, setSearch] = useState('');
  const isDisabled = validateItensOrder(itens) || !client;
  const router = useRouter();

  const handleClient = (e) => {
    setClient(e);
  };

  const handleItens = (e) => {
    setSearch('');
    setItens([
      ...itens,
      {
        ...e,
        id: itens.length + 1,
        errors: { quantity: '', liquidityPrice: '' },
      },
    ]);
  };

  const onChangePriceItem = (e, index, price) => {
    const newItens = [...itens];
    const liquidityPrice = e.target.value;
    const newLiquidityPrice = liquidityPrice ? parseFloat(liquidityPrice) : '';
    const newPrice = parseFloat(price);
    newItens[index].liquidityPrice = newLiquidityPrice;
    const total = newItens[index].quantity * newLiquidityPrice;
    newItens[index].total = total;
    const errors = newItens[index].errors;
    errors['liquidityPrice'] = '';

    const great = newLiquidityPrice > newPrice;
    const good = newLiquidityPrice >= newPrice * 0.9;
    const bad = newLiquidityPrice < newPrice * 0.9;

    if (bad) {
      newItens[index].rentability = 'bad';
      errors['liquidityPrice'] = 'Rentabilidade ruim';
    }
    if (good) {
      newItens[index].rentability = 'good';
    }
    if (great) {
      newItens[index].rentability = 'great';
    }
    if (newLiquidityPrice === '') {
      errors['liquidityPrice'] = '';
    }
    if (newLiquidityPrice <= 0) {
      errors['liquidityPrice'] = 'Quantidade deve ser maior que 0';
    }

    const totalOrder = calculateTotalOrder(newItens);

    setItens(newItens);
    setTotalOrder(totalOrder);
  };

  const onChangeQuantityItem = (e, index) => {
    const newItens = [...itens];
    const quantity = e.target.value;
    const newQuantity = quantity ? parseFloat(quantity) : '';
    const multiple = newItens[index].multiple;
    newItens[index].quantity = newQuantity;
    newItens[index].total = newQuantity * newItens[index].liquidityPrice;
    const errors = newItens[index].errors;
    errors['quantity'] = '';

    if (newQuantity % multiple !== 0 && multiple !== null) {
      errors['quantity'] = `Produto multiplo de ${multiple}`;
    }
    if (newQuantity <= 0) {
      errors['quantity'] = 'Quantidade deve ser maior que 0';
    }

    const totalOrder = calculateTotalOrder(newItens);

    setItens(newItens);
    setTotalOrder(totalOrder);
  };

  const handleRemoveItem = (id) => {
    const newItens = itens.filter((item) => item.id !== id);
    const totalOrder = calculateTotalOrder(newItens);
    setItens(newItens);
    setTotalOrder(totalOrder);
  };

  const handlePayment = (e) => {
    setPaymentCondition(e.target.value);
  };

  const handleSubmit = async () => {
    const newItens = itens.map((item) => ({
      produto_id: item.value,
      produto_nome: item.label,
      produto_multiplo: parseFloat(item.multiple),
      produto_preco_tabela: item.price,
      quantidade: item.quantity,
      preco_liquido: item.liquidityPrice,
      total: item.total,
      rentabilidade: item.rentability,
    }));
    const data = {
      cliente: client.value,
      cliente_nome: client.label,
      condicao_pagamento: paymentCondition,
      total: totalOrder,
      itens: newItens,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pedidos/`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    router.push('/pedidos');
  };

  return (
    <Layout>
      <Header title="Criar Pedido"></Header>

      <form className="order-form">
        <div className="order-form-container-input">
          <label>Cliente:</label>
          <Select
            value={client}
            onChange={handleClient}
            options={dataClient}
            placeholder="Selecione o cliente..."
          />
        </div>

        <div className="order-form-container-input">
          <label>Produtos:</label>
          <Select
            value={search}
            onChange={handleItens}
            options={dataProduct}
            placeholder="Selecione os produtos..."
          />
        </div>
        {itens.map((item, index) => (
          <div
            key={item.id}
            className="order-form-attributes order-form-container-input"
          >
            <div className="order-form-attributes-input">
              <label>Nome:</label>
              <span>{item.label}</span>
            </div>
            <div className="order-form-attributes-input">
              <label>Preço Tabela:</label>
              <span>R$ {item.price}</span>
            </div>
            <div className="order-form-attributes-input">
              <label htmlFor="quantity">Qtd:</label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => {
                  onChangeQuantityItem(e, index);
                }}
              />
              {item.errors.quantity && (
                <span className="errors">{item.errors.quantity}</span>
              )}
            </div>
            <div className="order-form-attributes-input">
              <label htmlFor="price">Preço Líquido:</label>
              <div className="price">
                R${' '}
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={item.liquidityPrice}
                  onChange={(e) => {
                    onChangePriceItem(e, index, item.price);
                  }}
                />
                {item.liquidityPrice !== '' && (
                  <Rentability type={item.rentability}>$</Rentability>
                )}
              </div>
              {item.errors.liquidityPrice && (
                <span className="errors">{item.errors.liquidityPrice}</span>
              )}
            </div>
            <div>
              <label>Total Item:</label>
              <span>R$ {item.total}</span>
            </div>
            <div className="order-form-attributes-input">
              <Tooltip title="excluir">
                <button
                  type="button"
                  className="remove-item"
                  onClick={() => {
                    handleRemoveItem(item.id);
                  }}
                >
                  <Excluir />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}

        <div className="total-order">
          <label>Total Pedido:</label>
          <span>R$ {totalOrder}</span>
        </div>

        <div className="payment">
          <label>Condição de pagamento:</label>
          <input
            type="text"
            name="payment"
            value={paymentCondition}
            onChange={handlePayment}
          />
        </div>
      </form>

      <Button
        title="Criar Pedido"
        onClick={handleSubmit}
        disabled={isDisabled}
      />

      <style jsx>
        {`
          .order-form {
            margin: 50px;
          }
          option {
            background-color: red;
          }
          .order-form-container-input {
            margin-bottom: 20px;
          }
          .order-form-attributes {
            display: flex;
            flex-direction: row;
            font-size: 15px;
            border-bottom: 1px solid #cccccc;
            align-items: center;
            padding: 10px 5px;
            justify-content: space-between;
          }
          input {
            border: 1px solid #cccccc;
            min-height: 30px;
            max-width: 200px;
            border-radius: 4px;
          }
          .order-form-attributes input {
            max-width: 80px;
            margin: 0 3px;
          }
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .remove-item {
            border: 1px solid #cccccc;
            background-color: transparent;
            border-radius: 4px;
          }
          .total-order {
            display: flex;
            justify-content: flex-end;
          }
          .total-order span {
            margin-left: 5px;
          }
          .payment {
            margin-top: 80px;
          }
          .price {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .errors {
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
          input[type='number'] {
            -moz-appearance: textfield;
          }
        `}
      </style>
    </Layout>
  );
}

export default CreateOrder;
