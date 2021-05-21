export default function Tooltip({children, title}) {
    return(
        <div className="overlay">
            {children}

            <div className="tooltip">
                <span className="tooltip-title">{title}</span>
            </div>

            <style jsx>
            {`
                .overlay{
                    position: relative;
                }
                .tooltip{
                    display: none;
                    position: absolute;
                    left: -50px;
                    top: -5px;
                    padding: 5px;
                    background-color: #ffffff;
                    border-radius: 5px;
                }
                .overlay:hover .tooltip{
                    display: block;
                }
                .tooltip-title{
                    color: #000000;
                    font-size: 11px;
                
            `}
            </style>
        </div>
    )
}