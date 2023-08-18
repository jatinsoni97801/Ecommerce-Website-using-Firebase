import React from 'react'
import { Link } from 'react-router-dom'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {auth} from '../Config/Config'
import { useNavigate } from 'react-router-dom'



export const Navbar = ({user,totalProducts}) => {

  const history = useNavigate();

  const handleLogout=()=>{
    auth.signOut().then(()=>{
          history('/login');
    })
  }

  return (
    <div className='navbar'>
    <div className='leftside'>
        <div className='logo'>
        <h2>Jsmart</h2>
        </div>
    </div>


    <div className='rightside'>

    {!user&&<>
                      
                    <div><Link className='navlink' to="signup">SIGN UP</Link></div>
                    <div><Link className='navlink' to="login">LOGIN</Link></div>
                </>}

                {user&&<>
                  <div className="imp-bt"><Link className='hm-bt' to="/">Home</Link>
                  <Link className='ct-bt' to="/cart">Cart</Link></div>
                 
                    <div><Link className='navlink' to="/">Hi {user}</Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="/cart">
                            <Icon icon={shoppingCart} size={20}/>
                        </Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div>
                    <div className='btn btn-danger btn-md'
                    onClick={handleLogout}>LOGOUT</div>
                </>}          
    
          
          </div>
          </div>

  )
}
