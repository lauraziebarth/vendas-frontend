import Rentability from "../components/rentability"
import Tooltip from "../components/tooltip"

export default function TableOrders({list}){
    return(
        <div className="table">
            {list.map(item=>(
                <div className="table-item">
                    <div className="order-info">
                        <a className="order-number" href={`/pedidos/${item.id}`}>Pedido {item.numero}</a>
                        <h2 className="client-name">Cliente: {item.cliente_nome}</h2>
                        <h3 className="order-total">Total: R${item.total}</h3>
                    </div>

                    
                    <div className="rentability-icon">
                        <Tooltip title={`${item.rentabilidade}`}>
                            <Rentability/>
                        </Tooltip>
                    </div>
                </div>     
            ))}

            <style jsx>
                {`
                .table{
                    display: flex;
                    align-content: top;
                    flex-direction: column;
                    margin-top: 30px;
                    margin-left: 50px;
                }
                .table-item{
                    padding: 20px 10px;;
                    border-top: 2px solid #f2f2f2;
                    flex-direction: row;
                    display: flex;
                    justify-content: space-between;
                }
                .table-item:hover{
                    background-color: #f2f2f2;
                    color: #4B2F7E;
                  }
                .order-number{
                    font-weight: bolder;
                    margin-bottom: 10px;
                }
                h2, h3{
                    font-weight: normal;
                    font-size: 13px;
                    color: #242424;
                    margin: 3px 0;
                }
                `}
            </style>

        </div>
    )
}