import {useState} from "react";

const Registration = ({onRegistration}) => {
    const [firm, setFirm] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [pesel, setPesel] = useState("")
    const [mailAddress, setMailAddress] = useState("")
    const [firmName, setFirmName] = useState(null)
    const [nip, setNip] = useState(null)
    const [firmAddress, setFirmAddress] = useState(null)
    const [firmMailingAddress, setFirmMailingAddress] = useState(null)

    return (
        <div className='row align-items-center justify-content-center' style={{minHeight: "80vh"}}>

            <div className='col-md-3 col-lg-4 col-1'></div>

            <div className='bg-light text-dark text-center col-lg-4 col-md-6 col-10 py-3 border-primary border-2 border'>
                <h5>Rejestracja</h5>
                <form onSubmit={(e) => {
                    onRegistration(email, password, firstName, lastName, pesel, mailAddress, firmName, nip, firmAddress, firmMailingAddress, firm)
                    e.preventDefault()
                }}>
                    <div className='row p-1'>
                        <div className="col-5 text-end">email: </div>
                        <div className="col-7 justify-content-start align-items-start">
                            <input type="text" className='form-text d-block w-75'
                                   value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="row p-1">
                        <div className="col-5 text-end">Hasło: </div>
                        <div className="col-7 justify-content-start align-items-start">
                            <input type="password" className='form-text d-block  w-75'
                                   value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                    </div>
                    <div className='row p-1'>
                        <div className="col-5 text-end">Imie: </div>
                        <div className="col-7 justify-content-start align-items-start">
                            <input type="text" className='form-text d-block w-75'
                                   value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                        </div>
                    </div>
                    <div className='row p-1'>
                        <div className="col-5 text-end">Nazwisko: </div>
                        <div className="col-7 justify-content-start align-items-start">
                            <input type="text" className='form-text d-block w-75'
                                   value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                        </div>
                    </div>
                    <div className='row p-1'>
                        <div className="col-5 text-end">Pesel: </div>
                        <div className="col-7 justify-content-start align-items-start">
                            <input type="text" className='form-text d-block w-75'
                                   value={pesel} onChange={(e) => setPesel(e.target.value)} maxLength='11' required/>
                        </div>
                    </div>
                    <div className='row p-1'>
                        <div className="col-5 text-end">Adres kor.: </div>
                        <div className="col-7 justify-content-start align-items-start">
                            <input type="text" className='form-text d-block w-75'
                                   value={mailAddress} onChange={(e) => setMailAddress(e.target.value)}  required/>
                        </div>
                    </div>
                    <div className='row p-1'>
                        <div className="col-5 text-end">Konto firmowe: </div>
                        <div className="col-7 justify-content-start align-items-start">
                            <input type="checkbox" className='form-check' checked={firm} onChange={() => setFirm(!firm)} />
                        </div>
                    </div>
                    { firm ?
                        <div>
                            <div className='row p-1'>
                                <div className="col-5 text-end">Nazwa firmy: </div>
                                <div className="col-7 justify-content-start align-items-start">
                                    <input type="text" className='form-text d-block w-75'
                                           value={firmName ? firmName : ""} onChange={(e) => setFirmName(e.target.value)} required/>
                                </div>
                            </div>
                            <div className='row p-1'>
                                <div className="col-5 text-end">nip: </div>
                                <div className="col-7 justify-content-start align-items-start">
                                    <input type="text" className='form-text d-block w-75'
                                           value={nip ? nip : ""} onChange={(e) => setNip(e.target.value)} maxLength='11' required/>
                                </div>
                            </div>
                            <div className='row p-1'>
                                <div className="col-5 text-end">Adres Firmy: </div>
                                <div className="col-7 justify-content-start align-items-start">
                                    <input type="text" className='form-text d-block w-75'
                                           value={firmAddress ? firmAddress : ""} onChange={(e) => setFirmAddress(e.target.value)}  required/>
                                </div>
                            </div>
                            <div className='row p-1'>
                                <div className="col-5 text-end">Adres kor. firmy: </div>
                                <div className="col-7 justify-content-start align-items-start">
                                    <input type="text" className='form-text d-block w-75'
                                           value={firmMailingAddress ? firmMailingAddress : ""} onChange={(e) => setFirmMailingAddress(e.target.value)} required/>
                                </div>
                            </div>
                        </div>
                        :<div></div>}
                    <div className="p-3">
                        <input type={'submit'} className='btn btn-outline-primary' value={'Zarejestruj'}/>
                    </div>

                </form>
            </div>

            <div className='col-md-3 col-lg-4 col-1'></div>
        </div>
    )
}

export default Registration