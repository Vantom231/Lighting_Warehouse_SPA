import {useState} from "react";

const Login = ({onReturn, onLogin}) => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className='row d-flex flex-grow-1 align-items-center justify-content-center' style={{height: "80vh"}}>
            <div className='col-4'></div>
                <div className='bg-light text-dark text-center col-4 py-3 border-primary border-2 border'>
                    <h5>Login</h5>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        onLogin(login, password)
                    }}>
                        <div className='row p-1'>
                            <div className="col-4 text-end">Email: </div>
                            <div className="col-8"><input type="text" className='form-text' value={login} onChange={(e) => setLogin(e.target.value)} required/></div>
                        </div>
                        <div className="row p-1">
                            <div className="col-4 text-end">Hasło: </div>
                            <div className="col-8"><input type="password" className='form-text' value={password} onChange={(e) => setPassword(e.target.value)} required/></div>
                        </div>
                        <div className="row p-1">
                            <div className="col-6"><input type={'submit'} className='btn btn-outline-primary' value={'Zaloguj'}/></div>
                            <div className="col-6"><button type={'button'} className='btn btn-outline-danger' onClick={() => onReturn(false)}>Powrót</button></div>
                        </div>
                    </form>
                </div>
            <div className='col-4'></div>
        </div>
    )
}

export default Login