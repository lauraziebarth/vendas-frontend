export default function Table({list}){
    return(
        <div className="table">
            {list.map(item=>(
                <div className="table-item">
                    <a href={`/clients/${item.id}`}>{item.nome}</a>
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
                    border-bottom: 2px solid #f2f2f2;
                    font-weight: bolder;
                    flex-direction: row;
                    display: flex;
                    justify-content: space-between;
                }
                .table-item:hover{
                    background-color: #f2f2f2;
                    color: #4B2F7E;
                  }
                .table-item-icon{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-content: top;
                }
                .icon{
                    padding: 0 3px;
                }
                `}
            </style>

        </div>
    )
}