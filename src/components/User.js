import {useEffect, useState} from "react";
import api from "../api/categories";

const User = ({onReturn, bearer, id, refresh}) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        fetchCustom(`http://127.0.0.1:8000/api/users/${id}`,setUser)
    },[])

    const fetchCustom = async (url, target) => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${bearer}`
            },
            data: ''
        }

        try{
            const response = await api.request(config)
            console.log(response.data)
            target(response.data.data)
        } catch (err) {
            if (err.response) {
                //not in 200 response range
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error ${err.message}`)
            }
        }
    }

    const patchUser = async () => {
        const config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/users/${id}`,
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${bearer}`
            },
            data: JSON.stringify(user)
        }

        try{
            const response = await api.request(config)
            console.log(response.data)
            refresh()
            onReturn()
        } catch (err) {
            if (err.response) {
                //not in 200 response range
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error ${err.message}`)
            }
        }
    }

    const deleteUser = async () => {
        const config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/users/${id}`,
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${bearer}`
            },
            data: ''
        }

        try{
            const response = await api.request(config)
            console.log(response.data)
            refresh()
            onReturn()
        } catch (err) {
            if (err.response) {
                //not in 200 response range
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error ${err.message}`)
            }
        }
    }

    return(
    <div className='row justify-content-center align-items-center'>
        <div className='col-md-4 col-sm-6 col-11 d-block gy-3'>
            <div className='text-center h4 mb-5'>Dane Użytkownika</div>

            <form onSubmit={(e) => {
                e.preventDefault()
                patchUser()
            }}>

            <div className='row my-2'>
                <div className='col-6'>Imie: </div>
                <div className='col-6'>
                    <input type="text" className='form-text w-100'
                           value={user.firstName} onChange={(e) => setUser({...user, firstName: e.target.value})} required={true}/>
                </div>
            </div>

            <div className='row my-2'>
                <div className='col-6'>nazwisko: </div>
                <div className='col-6'>
                    <input type="text" className='form-text w-100'
                           value={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value})} required={true}/>
                </div>
            </div>

            <div className='row my-2'>
                <div className='col-6'>pesel: </div>
                <div className='col-6'>
                    <input type="text" className='form-text w-100' minLength={11} size={11} pattern='[0123456789]{11}'
                           value={user.pesel} onChange={(e) => setUser({...user, pesel: e.target.value})} required={true}/>
                </div>
            </div>

            <div className='row my-2'>
                <div className='col-6'>email: </div>
                <div className='col-6'>
                    <input type="email" className='form-text w-100'
                           value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} required={true}/>
                </div>
            </div>

            <div className='row my-2'>
                <div className='col-6'>adres korespondencyjny: </div>
                <div className='col-6'>
                    <input type="text" className='form-text w-100'
                           value={user.mailingAddress} onChange={(e) => setUser({...user, mailingAddress: e.target.value})} required={true}/>
                </div>
            </div>

            {user.accountType === 'B' &&
                <div className='row my-2'>
                    <div className='col-6'>Nazwa firmy </div>
                    <div className='col-6'>
                        <input type="text" className='form-text w-100'
                               value={user.companyName} onChange={(e) => setUser({...user, companyName: e.target.value})} required={true}/>
                    </div>
                </div>
            }
            {user.accountType === 'B' &&
                <div className='row my-2'>
                    <div className='col-6'>adres Firmy: </div>
                    <div className='col-6'>
                        <input type="text" className='form-text w-100'
                               value={user.companyAddress} onChange={(e) => setUser({...user, companyAddress: e.target.value})} required={true}/>
                    </div>
                </div>
            }
            {user.accountType === 'B' &&
                <div className='row my-2'>
                    <div className='col-6'>nip </div>
                    <div className='col-6'>
                        <input type="text" className='form-text w-100' size={11} minLength={10} pattern='[0-9]{10-11}'
                               value={user.nip} onChange={(e) => setUser({...user, nip: e.target.value})} required={true}/>
                    </div>
                </div>
            }
            {user.accountType === 'B' &&
                <div className='row my-2'>
                    <div className='col-6'>adres kor. firmy: </div>
                    <div className='col-6'>
                        <input type="text" className='form-text w-100'
                               value={user.companyMailingAddress} onChange={(e) => setUser({...user, companyMailingAddress: e.target.value})} required={true}/>
                    </div>
                </div>
            }

            <div className='row mt-4 justify-content-lg-between justify-content-center g-lg-0 g-2'>
                <button className='btn btn-primary col-xl-2 col-lg-3 col-md-5' type="button" onClick={onReturn}>powrót</button>
                <button className='btn btn-danger col-xl-2 col-lg-3 col-md-5' type="button" onClick={deleteUser}>usuń</button>
                <button className='btn btn-success col-xl-2 col-lg-3 col-md-5' type="submit" >edytuj</button>
            </div>
            </form>
        </div>

    </div>
    )
}

export default User