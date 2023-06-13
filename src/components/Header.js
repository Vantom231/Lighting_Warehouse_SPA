const Header = ({onLogin, onLogout, onRegistration, onNav, user}) => {
    const accountType = () => {
        const type = user.accountType.toUpperCase()

        if ( type === 'I' || type === 'B') {
            return "konto klienckie"
        }else if ( type === 'W') {
            return "konto pracownika"
        }else if ( type === 'A') {
            return "konto administratora"
        }
        return "konto nieznane"
    }

   return (
       <header className='navbar navbar-dark p-3 ' style={{backgroundColor: '#2222AA', opacity: '75%'}}>
           <div className='navbar-brand h1 mb-2 mb-md-0'>GlowHouse</div>
           <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ms-md-4'>
               <li className='nav-link px-2' onClick={() => onNav(1)}>Strona główna</li>
               <li className='nav-link px-2' onClick={() => onNav(2)}>Produkty</li>
               <li className='nav-link px-2' onClick={() => onNav(3)}>Koszyk</li>

               {user.accountType === 'W' && <li className='nav-link px-2' onClick={() => onNav(5)}>Panel pracownika</li> }
               {user.accountType === 'A' && <li className='nav-link px-2' onClick={() => onNav(7)}>Panel administratora</li> }
           </ul>
               { user !== "" ? <ul className='nav col-12 col-lg-auto mb-2 justify-content-end mb-md-0'>
                       <li className='nav-link px-2 mt-1 text-light'>{accountType()}: {user.firstName} {user.lastName}</li>
                       <li className='nav-link px-2'>
                           <button className='btn btn-outline-info'  onClick={onLogout}>Wyloguj</button>
                       </li>
                   </ul>
                   :<ul className='nav col-12 col-lg-auto mb-2 justify-content-end mb-md-0'>
                       <li className='nav-link px-2'>
                           <button className='btn btn-outline-info' onClick={() => onLogin(true)}>Login</button>
                       </li>
                       <li className='nav-link px-2'>
                           <button className='btn btn-outline-danger' onClick={onRegistration}>Zarejestruj</button>
                       </li>
                   </ul>
               }
       </header>
   )
}

export default Header