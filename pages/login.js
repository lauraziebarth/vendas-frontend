function Login() {
    return (
        <main>

            <div className="page-box">
                <div className="titulo-principal">
                    <h1>Sistema de Pedidos</h1>
                </div>

                <div className="login-box">
                    <h2>Faça seu login!</h2>

                    <div className="login-form">
                        <div className="input-email">
                            <input id="email" className="input" type="text" pattern=".+" required />
                            <label className="label" for="email">Email</label>
                        </div>
                        <div className="input-senha">
                            <input id="senha" className="input" type="text" pattern=".+" required />
                            <label className="label" for="senha">Senha</label>
                        </div>
                    </div>
                </div>
            </div>
        
            <style jsx>
                {`
                .page-box {
                    display: flex;
                    max-width: 1300px;
                    margin: 100px auto;
                    justify-content: center;
                    flex-direction: column;
                    border-radius: 5px;
                }
                .titulo-principal{
                    display: flex;
                    align-content: top;
                    margin: 50px;
                    justify-content: center;
                }
                .login-box{
                    padding-top: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    align-content: center;
                    background-color: #FFFFFF;
                }
                .login-form{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    max-width: 500px;
                }
                .input-email, .input-senha {
                    position: relative;
                }
                .input {
                    border: 0;
                    border-bottom: 2px solid #9e9e9e;
                    outline: none;
                    transition: .2s ease-in-out;
                    box-sizing: border-box;
                }                  
                .label {
                    top: 0;
                    left: 0; 
                    right: 0;
                    color: #616161;
                    display: flex;
                    align-items: center;
                    position: absolute;
                    font-size: 1rem;
                    cursor: text;
                    transition: .2s ease-in-out;
                    box-sizing: border-box;
                }                  
                .input,
                .label {
                    width: 300px;
                    height: 3rem;
                    font-size: 1rem;
                    margin-top: 20px;
                }
                .input:valid,
                .input:focus {
                    border-bottom: 2px solid #663f93;  
                }

                .input:valid + label,
                .input:focus + label {
                    color: #663f93;
                    font-size: .8rem;
                    top: -30px;
                    pointer-events: none;
                }
                `}
            </style>
            
        </main>
      ) 
  }
  
  export default Login
