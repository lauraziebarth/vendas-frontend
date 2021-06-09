export default function Rentability({children, type}){
    return(
        <div className="box-rentability-order">
            <span className={`rentability ${type}`}>{children}</span>
      
        <style jsx>
            {`
            .rentability{
                font-size: 13px;
                border-radius: 100px;
                text-align: center;
                padding: 2px 5px;
                display: inline-block;
                height: 20px;
                min-width: 20px;
            }
            .great{
                color: #FFF;
                background-color: #00b300;
            }
            .good{
                color: #000;
                background-color: #ffe066;
            }
            .bad{
                color: #FFF;
                background-color: #ff4000;
            }
            `}
        </style>

        </div>
    )
}

