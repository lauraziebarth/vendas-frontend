export default function Menu(){
    return(
        <nav className="sidebar">
            <li className="sidebar-orders">
                <a href="/pedidos">Pedidos</a>
            </li>
            <li className="sidebar-products">
                <a href="/produtos">Produtos</a>
            </li>
            <li className="sidebar-clients">
                <a href="/clientes">Clientes</a>
            </li>
            <li className="sidebar-users">
                <a href="/usuarios">Usuários</a>
            </li>

        <style jsx>
            {`
            .sidebar{
                display: flex;
                flex-direction: column;
                list-style: none;
                border-right: 2px solid #f2f2f2;
            }
            .sidebar li{
                list-style: none;
                margin: 30px;
            }
            .sidebar a{
                text-decoration: none;
            }
            `}
        </style>
        
        </nav>
    )
}