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
function Dashboard() {
                  console.log('from dash!!')

  const navigate = useNavigate();
  const [user,setUser]=useState({})
    const location = useLocation();
    var retrievedObject="";
    let [obj,setObj]=useState({})
    // let obj={}
    let flag=false;
    useEffect(() => {
                console.log('from 1 dash!!')
       if (location.state){          
          let user1=location.state.userCur;
          setUser(user1)
          console.log(user1)
          console.log('from 2 dash!!')
    //       // console.log(user1)
          localStorage.setItem('curUserObj',JSON.stringify(user1))
       }
          retrievedObject = localStorage.getItem('curUserObj');
          setObj(JSON.parse(retrievedObject))
          console.log('obj')
          console.log(obj)
          flag=true;
         
        
    //     else{
    //       console.log('error!!!??!')
    //     }        
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
      <p className='welcomeMessage'>Welcome, {obj&&obj.fname}</p>
      <div className='profileDetails'>
        <div className='fName'>
           <p>FIRST NAME : </p>
            <p>{obj&&obj.fname}</p>
          </div>
          <div className='lName'>
          <p>LAST NAME : </p>
             <p>{obj&&obj.lname}</p>
          </div>            
        <br></br>
        <div className='contactDetails'>
           <div className='emailID'>
             <p className='desc1'>EMAIL ID : </p>
            <p className='vals1'>{obj&&obj.email}</p>
          </div>
          <div className='cnNo'>
              <p className='desc2'>CONTACT NUMBER : </p>
             <p className='vals2'>{obj&&obj.phNumber}</p>
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
