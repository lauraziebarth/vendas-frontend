export default function Header({children, titulo}){
    return(
        <div>

            <div className="titulo-principal">
                <h1>{titulo}</h1>
            </div>
            
            {children}

            <style jsx>
            {`
            .titulo-principal{
                display: flex;
                flex-direction: column;
                align-content: top;
                margin-left: 50px;
                border-bottom: 2px solid #f2f2f2;
            }
            `}
            </style>

        </div>
    )
}

