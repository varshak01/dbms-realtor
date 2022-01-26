import React,{useState,useEffect} from 'react';
import Navbar from './Navbar';
import './navbar.css';
import './dashboard.css'
import {useLocation} from 'react-router-dom';
import axios from "axios"

import {
  BrowserRouter as Router,  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
function Dashboard({setLoginUser}) {
  const navigate = useNavigate();
  const [user,setUser]=useState({})
    const location = useLocation();
    var retrievedObject="";
    const [obj,setObj]=useState({})
    useEffect( () => {
        
        if (location.state){
          
          let user1=location.state.userCur;
          setUser(user1)
          console.log('from dash!!')
          console.log(user1)
          localStorage.setItem('curUserObj',JSON.stringify(user1))
          retrievedObject = localStorage.getItem('curUserObj');
          setObj(JSON.parse(retrievedObject))
          console.log('obj')
          console.log(obj)
         
        }
        // axios.get("http://localhost:9002/dashboard")
        //     .then( res => {
        //         console.log(res.data)
        //     })
        
      },[]);
  const houseRent=()=>{
     var retrievedObject = localStorage.getItem('curUserObj');
      console.log("retrievedObject")
      let user12=JSON.parse(retrievedObject)
      console.log(user12)
     navigate('/houseRent',{ state: { user:user12}})
  }
  const houseSale=()=>{
    var retrievedObject = localStorage.getItem('curUserObj');
      console.log("retrievedObject")
      let user12=JSON.parse(retrievedObject)
      navigate('/houseSale',{ state: { user:user12 }})
  }
  const pgData=()=>{
    var retrievedObject = localStorage.getItem('curUserObj');
      console.log("retrievedObject")
      let user12=JSON.parse(retrievedObject)
      navigate('/pgData',{ state: { user:user12 }})
  }
  const requestData=()=>{
    var retrievedObject = localStorage.getItem('curUserObj');
      console.log("retrievedObject")
      let user12=JSON.parse(retrievedObject)
      navigate('/requestsData',{ state: { user:user12 }})
  }
  return (<div>
      <Navbar/>
      <p className='welcomeMessage'>Welcome, {JSON.parse(localStorage.getItem('curUserObj')).fname}</p>
      <div className='profileDetails'>
        <div className='fName'>
           <p>FIRST NAME : </p>
            <p>{JSON.parse(localStorage.getItem('curUserObj')).fname}</p>
          </div>
          <div className='lName'>
          <p>LAST NAME : </p>
             <p>{JSON.parse(localStorage.getItem('curUserObj')).lname}</p>
          </div>            
        <br></br>
        <br></br>
        <div className='contactDetails'>
           <div className='emailID'>
             <p className='desc1'>EMAIL ID : </p>
            <p className='vals1'>{JSON.parse(localStorage.getItem('curUserObj')).email}</p>
          </div>
          <div className='cnNo'>
              <p className='desc2'>CONTACT NUMBER : </p>
             <p className='vals2'>{JSON.parse(localStorage.getItem('curUserObj')).phNumber}</p>
          </div>      
        </div>
      </div>
      <div className='allBtns'>
        <span className='title'>YOUR DATA : </span>
        <div className='houseBtns'>
          <button className='btn' onClick={houseRent}>HOUSES FOR RENT</button>
          <button className='btn' onClick={houseSale}>HOUSES FOR SALE</button>
        </div>
        <div className='houseBtns'>
          <button className='btn' onClick={pgData}>PG</button>
          <button className='btn' onClick={requestData}>REQUESTS</button>
        </div>
      </div>
  
  </div>)
}

export default Dashboard;
