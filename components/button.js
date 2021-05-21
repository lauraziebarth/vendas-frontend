export default function Button({title}){
    return(
        <div className="box-button">
            <button type="button" className="button">+ {title}</button>
        
        <style jsx>
            {`
            .box-button{
                display: flex;
                align-content: top;
                margin-top: 30px;
                margin-left: 50px;
            }
            .button{
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

        </div>
    )
}

