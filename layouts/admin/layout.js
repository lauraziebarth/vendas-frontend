import Menu from "../../components/menu"

export default function Layout({children}){
    return(

        <div className="layout">
            <Menu/>

            <div className="layout-content">
                {children}
            </div>

        <style jsx>
            {`
            .layout{
                display: flex;
                flex-direction: row;
                background-color: #ffffff;
                max-width: 800px;
                margin: 100px auto;
                border-radius: 3px;
            }
            .layout-content{
                display: flex;
                flex-direction: column;
                width: 80%;
            }
            `}
        </style>

        </div>
                
                    
    )
}