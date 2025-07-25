import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import useCart from '../../../Hooks/useCart';
import { FaShoppingCart } from "react-icons/fa";
import useAdmin from '../../../Hooks/useAdmin';


const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const { isAdmin } = useAdmin();

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .then(error => console.log(error));
    }

    const navOptions = (<>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><Link to="/shop/salad">Our Shop</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/secret">Secret</Link></li>
        {
            user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        }
        <li><Link to="/dashboard/cart">
            <button className="btn">
                <FaShoppingCart className='mr-2'></FaShoppingCart>
                <div className="badge badge-sm badge-secondary">+{cart.length}</div>
            </button>
        </Link></li>


        {
            user ? <>
                <span>{user?.displayName}</span>
                <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
            </> : <>
                <li><Link to="/login">Login</Link></li></>
        }
        <li><Link to="dashboard">Dashboard</Link></li>
    </>
    );

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl mx-auto text-white bg-black shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss <br />Restuarent</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </>
    );
};

export default NavBar;