import React, {useEffect, useState} from "react"
import "./login.css"
import axios from "axios"
import { useForm } from "react-hook-form";

import {
  BrowserRouter as Router,  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";

const Login = () => {
      const { register, handleSubmit, watch, formState: { errors },setValue,getValue } = useForm();

        const [loginUser,setLoginUser]=useState()    
        const navigate = useNavigate()
        useEffect(()=>{
            console.log("login")
    },[])
    let [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        console.log("user!!")
        console.log(user)
        setUser({
            ...user,
            [name]: value
        })
    }
    const login = () => {
        console.log(user)
        axios.post("http://localhost:9002/login", user)
        .then(res => {
            alert(res.data.message)
            user=res.data.user
            console.log(res.data.user)
            // console.log(user)
            // setUser()
            // console.log(loginUser)
            if(user)
            navigate("/dashboard",{ state: { userCur:user }})
        })
    }
    // async function submitForm(data){
    //     console.log("clicked")
    //      console.log(data)
    //     // axios.post("http://localhost:9002/login", user)
    //     // .then(res => {
    //     //     alert(res.data.message)
    //     //     user=res.data.user
    //     //     console.log(res.data.user)
    //     //     // console.log(user)
    //     //     // setUser()
    //     //     // console.log(loginUser)
    //     //     if(user)
    //     //     navigate("/dashboard",{ state: { userCur:user }})
    //     // })
    // }

    return (
        <div className="screenFirst">
        <div className="frontImages">
            <img className="pic1" src="/images/pic1.png" alt=""/>
            <img className="pic2" src="/images/pic2.png" alt=""/>
            <img className="pic3" src="/images/pic3.png" alt=""/>
        </div>
           
        <div className="login">
        <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
        <div>or</div>
        <div className="button" onClick={() => navigate("/register")}>Register</div>
        </div>
        </div>
 
        
    )
}

export default Login