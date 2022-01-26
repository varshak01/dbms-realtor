import React,{useEffect,useState} from "react"
import "./homepage.css"
import {useLocation} from 'react-router-dom';

const Homepage = ({setLoginUser}) => {
    const [user,setUser]=useState({})
    const location = useLocation();
    useEffect( () => {
        
        if (location.state){
          
          let user1=location.state.user;
          setUser(user1)
        }
        
      }, []);
    return (
        <div className="homepage">
            <h1>Hello {user.email}</h1>
            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        </div>
    )
}
export default Homepage;