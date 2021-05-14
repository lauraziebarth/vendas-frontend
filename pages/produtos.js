function Produtos() {
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

                <div className="pagina-produtos">
                    <div className="titulo-principal">
                        <h1>Produtos</h1>
                    </div>
                    <div className="box-button-criar-produto">
                        <button type="button" className="button-criar-produto">Criar Produto</button>
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
                .pagina-produtos{
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
                .box-button-criar-produto{
                    display: flex;
                    align-content: top;
                    margin-top: 30px;
                    margin-left: 50px;
                }
                .button-criar-produto{
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
  
  export default Produtos