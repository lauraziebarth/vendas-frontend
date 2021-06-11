import Tooltip from '../components/tooltip';
import Editar from '../assets/svg/editar.svg';

export default function TableOrders({ list }) {
  return (
    <div className="table">
      {list.map((item) => (
        <div className="table-item">
          <div className="order-info">
            <h1>Pedido {item.id}</h1>
            <h2 className="client-name">Cliente: {item.cliente_nome}</h2>
            <h3 className="order-total">Total: R${item.total}</h3>
          </div>

          <div className="table-item-icon">
            <Tooltip title="editar">
              <a className="icon" href={`/pedidos/pedido/${item.id}`}>
                <Editar />
              </a>
            </Tooltip>
          </div>
        </div>
      ))}

      <style jsx>
        {`
          .table {
            display: flex;
            align-content: top;
            flex-direction: column;
            margin-top: 30px;
            margin-left: 50px;
          }
          .table-item {
            padding: 20px 10px;
            border-bottom: 2px solid #f2f2f2;
            flex-direction: row;
            display: flex;
            justify-content: space-between;
          }
          h1 {
            font-weight: 600;
            font-size: 18px;
          }
          .table-item:hover {
            background-color: #f2f2f2;
            color: #4b2f7e;
          }
          .order-number {
            font-weight: bold;
            margin-bottom: 10px;
          }
          h2,
          h3 {
            font-weight: normal;
            font-size: 13px;
            color: #242424;
            margin: 3px 0;
          }
        `}
      </style>
    </div>
  );
}
