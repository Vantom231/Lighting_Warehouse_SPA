const Header = ({onLogin, onLogout, onNav, user}) => {
   return (
       <header className='navbar navbar-dark p-3' style={{backgroundColor: '#3333AA'}}>
           <div className='navbar-brand h1 mb-2 mb-md-0'>Lightning Warehouse</div>
           <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ms-md-4'>
               <li className='nav-link px-2' onClick={() => onNav(1)}>Strona główna</li>
               <li className='nav-link px-2' onClick={() => onNav(2)}>Produkty</li>
               <li className='nav-link px-2' onClick={() => onNav(3)}>Koszyk</li>
           </ul>
               { user !== "" ? <ul className='nav col-12 col-lg-auto mb-2 justify-content-end mb-md-0'>
                       <li className='nav-link px-2 mt-1 text-dark'> {user.firstName} {user.lastName}</li>
                       <li className='nav-link px-2'>
                           <button className='btn btn-outline-info'  onClick={onLogout}>Wyloguj</button>
                       </li>
                   </ul>
                   :<ul className='nav col-12 col-lg-auto mb-2 justify-content-end mb-md-0'>
                       <li className='nav-link px-2'>
                           <button className='btn btn-outline-info' onClick={() => onLogin(true)}>Login</button>
                       </li>
                       <li className='nav-link px-2'>
                           <button className='btn btn-outline-danger'>Register</button>
                       </li>
                   </ul>
               }
       </header>
   )
}

export default Header