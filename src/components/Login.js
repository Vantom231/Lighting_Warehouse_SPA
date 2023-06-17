import {useState} from "react";

const Login = ({onReturn, onLogin}) => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className='row align-items-center justify-content-center g-0' style={{minHeight: '80vh'}}>
            <div className='col-md-4 col-xxl-5 col-2'></div>
                <div className='bg-light text-dark text-center col-md-4 col-xxl-2 col-8 py-3 border-primary border-2 border'>
                    <h5>Login</h5>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        onLogin(login, password)
                    }}>
                        <div className='row p-1'>
                            <div className="col-sm-4 text-sm-end text-start col-12">Email: </div>
                            <div className="col-sm-8 col-12"><input type="email" className='form-text w-75' value={login} onChange={(e) => setLogin(e.target.value)} required/></div>
                        </div>
                        <div className="row p-1">
                            <div className="col-sm-4 text-sm-end text-start col-12">Hasło: </div>
                            <div className="col-sm-8 col-12"><input type="password" className='form-text w-75' value={password} onChange={(e) => setPassword(e.target.value)} required/></div>
                        </div>
                        <div className="row p-1">
                            <div className="col-sm-6 my-sm-0 my-3 col-12"><input type={'submit'} className='btn btn-outline-primary' value={'Zaloguj'}/></div>
                            <div className="col-sm-6 my-sm-0 my-3 col-12"><button type={'button'} className='btn btn-outline-danger' onClick={() => onReturn(false)}>Powrót</button></div>
                        </div>
                    </form>
                </div>
            <div className='col-md-4 col-xxl-5 col-2'></div>
        </div>
    )
}

export default Login