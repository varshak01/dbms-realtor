import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const history = useNavigate()

    const [ user, setUser] = useState({
        fname: "",
        lname:"",
        email:"",
        phNumber:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { fname,lname, email,phNumber, password, reEnterPassword } = user
        if( fname &&lname&& email && phNumber&&password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register", user)
            .then( res => {
                alert(res.data.message)
                history("/")
            })
        } else {
            alert("INVALID INPUT!")
        }
        
    }

    return (
        <div className="screenFirst">
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="fname" value={user.fname} placeholder="First Name" onChange={ handleChange }></input>
            <input type="text" name="lname" value={user.lname} placeholder="Last Name" onChange={ handleChange }></input>
            <input type="email" name="email" value={user.email} placeholder="E-mail" onChange={ handleChange }></input>
            <input type="text" name="phNumber" value={user.phNumber} placeholder="Contact Number" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history("/login")}>Login</div>
        </div>
        </div>
        
    )
}

export default Register