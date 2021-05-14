import React from 'react'

export default function Menu(){
    return(
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
    )
}