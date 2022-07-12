import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const { setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate()
    const login = (e) => {
        e.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
        navigate('/posts')
    }
    return (
        <div>
            <h2>Login page</h2>
            <form onSubmit={login}>
                <MyInput placeholder='Login' type='text'/>
                <MyInput placeholder='Password' type='password'/>
                <MyButton>Login</MyButton>
            </form>
        </div>
    );
};

export default Login;