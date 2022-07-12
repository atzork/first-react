import React, {useContext} from 'react';
import {AuthContext} from "../../../context";
import {Link, useNavigate} from "react-router-dom";
import MyButton from "../button/MyButton";

const Navbar = () => {
    const {setIsAuth, isAuth} = useContext(AuthContext)
    const navigate = useNavigate();
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
        navigate('/login')
    }
    return (
        <div className='navbar'>
            {
                isAuth
                    ? <MyButton onClick={logout}>Logout</MyButton>
                    : ''
            }
            <div className='navbar__links'>
                <Link to='about'>About</Link>
                <Link to='posts'>Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;