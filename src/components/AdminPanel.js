import {useEffect, useState} from "react";
import api from "../api/categories";
import User from "./User";

const AdminPanel = ({bearer}) => {
    const [invUsers, setInvUsers] = useState([])
    const [buisUsers, setBuisUsers] = useState([])
    const [workers, setWorkers] = useState([])
    const [admins, setAdmins] = useState([])
    const [page, setPage] = useState(1)
    const [id, setId] = useState(1)
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        if (refresh) {
            fetchCustom("http://127.0.0.1:8000/api/users?accountType[eq]=I", setInvUsers)
            fetchCustom("http://127.0.0.1:8000/api/users?accountType[eq]=B", setBuisUsers)
            fetchCustom("http://127.0.0.1:8000/api/users?accountType[eq]=W", setWorkers)
            fetchCustom("http://127.0.0.1:8000/api/users?accountType[eq]=A", setAdmins)

            setRefresh(false)
        }

    }, [refresh])

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
            target(response.data)
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

    const onReturn = () => {
        setPage(1)
    }

    const refreshTables = () => {
        setRefresh(true)
    }

    const adminTablesView = () => {
        return (
            <div>
                <div className='h3 text-center'>
                    Panel Administratora
                </div>
                <div className="row">
                    <div className="col-xl-6 col-12 p-4">
                        <div className='h5 text-center'>Użytkownicy prywatni</div>
                        { invUsers.data && invUsers.data.length >= 0 &&<div>
                            <table className='table table-hover table-sm table-responsive border border-secondary'>
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Imie</th>
                                    <th>Nazwisko</th>
                                    <th>pesel</th>
                                    <th>email</th>
                                </tr>
                                </thead>
                                <tbody>
                                {invUsers.data && invUsers.data.length >= 0 && invUsers.data.map((e) =>
                                    <tr key={e.id} onClick={() => {
                                        setId(e.id)
                                        setPage(0)
                                    }}>
                                        <td>{e.id}</td>
                                        <td>{e.firstName}</td>
                                        <td>{e.lastName}</td>
                                        <td>{e.pesel}</td>
                                        <td>{e.email}</td>
                                    </tr>
                                )
                                }

                                </tbody>
                            </table>

                            <div className='row justify-content-between px-2'>
                                {invUsers.links.prev != null ?
                                    <button className='btn btn-primary btn-sm col-2' onClick={() => {
                                        const temp = invUsers.links.prev.split("?")
                                        const tempURL = temp[0] + "?accountType[eq]=I&" + temp[1]
                                        fetchCustom(tempURL, setInvUsers)
                                    }}>poprzednia</button> :
                                    <button className='btn btn-secondary btn-sm col-2' disabled>poprzednia</button>
                                }
                                {invUsers.links.next != null ?
                                    <button className='btn btn-primary btn-sm col-2' onClick={() => {
                                        const temp = invUsers.links.next.split("?")
                                        const tempURL = temp[0] + "?accountType[eq]=I&" + temp[1]
                                        console.log(tempURL)
                                        fetchCustom(tempURL, setInvUsers)
                                    }}>następna</button> :
                                    <button className='btn btn-secondary btn-sm col-2' disabled>następna</button>
                                }
                            </div>
                        </div>}
                    </div>
                    <div className="col-xl-6 col-12 p-4">
                        <div className='h5 text-center'>Użytkownicy Biznesowi</div>
                        {buisUsers.data && buisUsers.data.length && <div>
                            <table className='table table-hover table-sm table-responsive border border-secondary'>
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Imie</th>
                                    <th>Nazwisko</th>
                                    <th>pesel</th>
                                    <th>email</th>
                                </tr>
                                </thead>
                                <tbody>
                                {buisUsers.data && buisUsers.data.length >= 0 && buisUsers.data.map((e) =>
                                    <tr key={e.id} onClick={() => {
                                        setId(e.id)
                                        setPage(0)
                                    }}>
                                        <td>{e.id}</td>
                                        <td>{e.firstName}</td>
                                        <td>{e.lastName}</td>
                                        <td>{e.pesel}</td>
                                        <td>{e.email}</td>
                                    </tr>
                                )
                                }

                                </tbody>
                            </table>
                            <div className='row justify-content-between px-2'>
                                {buisUsers.links.prev != null ?
                                    <button className='btn btn-primary btn-sm col-2' onClick={() => {
                                        const temp = buisUsers.links.prev.split("?")
                                        const tempURL = temp[0] + "?accountType[eq]=B&" + temp[1]
                                        fetchCustom(tempURL, setBuisUsers)
                                    }}>poprzednia</button> :
                                    <button className='btn btn-secondary btn-sm col-2' disabled>poprzednia</button>
                                }
                                {buisUsers.links.next != null ?
                                    <button className='btn btn-primary btn-sm col-2' onClick={() => {
                                        const temp = buisUsers.links.next.split("?")
                                        const tempURL = temp[0] + "?accountType[eq]=B&" + temp[1]
                                        console.log(tempURL)
                                        fetchCustom(tempURL, setBuisUsers)
                                    }}>następna</button> :
                                    <button className='btn btn-secondary btn-sm col-2' disabled>następna</button>
                                }
                            </div>

                        </div>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-12 p-4">
                        <div className='h5 text-center'>Pracownicy</div>
                        { workers.data && workers.data.length >= 0 &&<div>
                            <table className='table table-hover table-sm table-responsive border border-secondary'>
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Imie</th>
                                    <th>Nazwisko</th>
                                    <th>pesel</th>
                                    <th>email</th>
                                </tr>
                                </thead>
                                <tbody>
                                {workers.data && workers.data.length >= 0 && workers.data.map((e) =>
                                    <tr key={e.id} onClick={() => {
                                        setId(e.id)
                                        setPage(0)
                                    }}>
                                        <td>{e.id}</td>
                                        <td>{e.firstName}</td>
                                        <td>{e.lastName}</td>
                                        <td>{e.pesel}</td>
                                        <td>{e.email}</td>
                                    </tr>
                                )
                                }

                                </tbody>
                            </table>

                            <div className='row justify-content-between px-2'>
                                {workers.links.prev != null ?
                                    <button className='btn btn-primary btn-sm col-2' onClick={() => {
                                        const temp = workers.links.prev.split("?")
                                        const tempURL = temp[0] + "?accountType[eq]=W&" + temp[1]
                                        fetchCustom(tempURL, setWorkers)
                                    }}>poprzednia</button> :
                                    <button className='btn btn-secondary btn-sm col-2' disabled>poprzednia</button>
                                }
                                {workers.links.next != null ?
                                    <button className='btn btn-primary btn-sm col-2' onClick={() => {
                                        const temp = workers.links.next.split("?")
                                        const tempURL = temp[0] + "?accountType[eq]=W&" + temp[1]
                                        console.log(tempURL)
                                        fetchCustom(tempURL, setWorkers)
                                    }}>następna</button> :
                                    <button className='btn btn-secondary btn-sm col-2' disabled>następna</button>
                                }
                            </div>
                        </div>}
                    </div>
                    <div className="col-xl-6 col-12 p-4">
                        <div className='h5 text-center'>Administratorzy</div>
                        {admins.data && admins.data.length && <div>
                            <table className='table table-hover table-sm table-responsive border border-secondary'>
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Imie</th>
                                    <th>Nazwisko</th>
                                    <th>pesel</th>
                                    <th>email</th>
                                </tr>
                                </thead>
                                <tbody>
                                {admins.data && admins.data.length >= 0 && admins.data.map((e) =>
                                    <tr key={e.id} onClick={() => {
                                        setId(e.id)
                                        setPage(0)
                                    }}>
                                        <td>{e.id}</td>
                                        <td>{e.firstName}</td>
                                        <td>{e.lastName}</td>
                                        <td>{e.pesel}</td>
                                        <td>{e.email}</td>
                                    </tr>
                                )
                                }

                                </tbody>
                            </table>
                            <div className='row justify-content-between px-2'>
                                {admins.links.prev != null ?
                                    <button className='btn btn-primary btn-sm col-2' onClick={() => {
                                        const temp = admins.links.prev.split("?")
                                        const tempURL = temp[0] + "?accountType[eq]=A&" + temp[1]
                                        fetchCustom(tempURL, setAdmins)
                                    }}>poprzednia</button> :
                                    <button className='btn btn-secondary btn-sm col-2' disabled>poprzednia</button>
                                }
                                {admins.links.next != null ?
                                    <button className='btn btn-primary btn-sm col-2' onClick={() => {
                                        const temp = admins.links.next.split("?")
                                        const tempURL = temp[0] + "?accountType[eq]=A&" + temp[1]
                                        console.log(tempURL)
                                        fetchCustom(tempURL, setAdmins)
                                    }}>następna</button> :
                                    <button className='btn btn-secondary btn-sm col-2' disabled>następna</button>
                                }
                            </div>

                        </div>}
                    </div>
                </div>
            </div>

        )
    }

    return page === 1 ?adminTablesView() : <User onReturn={onReturn} bearer={bearer} id={id} refresh={refreshTables}/>

}

export default AdminPanel