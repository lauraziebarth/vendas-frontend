function Clientes() {
    return (
        <main>

            <div className="page-box">
                <nav className="menu-lateral">
                    <li className="menu-lateral-pedido">
                        <a href="/pedidos">Pedidos</a>
                    </li>
                    <li className="menu-lateral-produtos">
                        <a href="/produtos">Produtos</a>
                    </li>
                    <li className="menu-lateral-clientes">
                        <a href="/clientes">Clientes</a>
                    </li>
                    <li className="menu-lateral-usuarios">
                        <a href="/usuarios">Usuários</a>
                    </li>
                </nav>

                <div className="pagina-clientes">
                    <div className="titulo-principal">
                        <h1>Clientes</h1>
                    </div>
                    <div className="box-button-criar-cliente">
                        <button type="button" className="button-criar-cliente">Criar Cliente</button>
                    </div>
                </div>
            </div>
        
            <style jsx>
                {`
                .page-box{
                    display: flex;
                    flex-direction: row;
                    background-color: #ffffff;
                    max-width: 1300px;
                    margin: 200px auto;
                    border-radius: 3px;
                }
                .menu-lateral{
                    display: flex;
                    flex-direction: column;
                    list-style: none;
                    border-right: 2px solid #f2f2f2;
                    width: 10%;                 
                }
                .menu-lateral li{
                    list-style: none;
                    margin: 30px;
                }
                .menu-lateral a{
                    text-decoration: none;
                }
                .pagina-clientes{
                    display: flex;
                    flex-direction: column;
                    width: 80%;
                }
                .titulo-principal{
                    display: flex;
                    flex-direction: column;
                    align-content: top;
                    margin-left: 50px;
                    border-bottom: 2px solid #f2f2f2;
                }
                .box-button-criar-cliente{
                    display: flex;
                    align-content: top;
                    margin-top: 30px;
                    margin-left: 50px;
                }
                .button-criar-cliente{
                    padding: 10px;
                    border: 1px solid #f2f2f2;
                    border-radius: 10px;
                    width: auto;
                    background-color: #4B2F7E;
                    color: #ffffff;
                    justify-content: flex-end;
                    font-weight: bolder;
                }
                `}
            </style>
            
        </main>
      ) 
  }
  
  export default Clientes