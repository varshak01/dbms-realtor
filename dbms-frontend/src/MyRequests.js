import React from 'react';
import Navbar from './Navbar';
import './houses.css'
import { GrAdd } from "react-icons/gr";
import {useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from "axios"

import {
  BrowserRouter as Router,  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
function MyRequests() {
  const [user,setUser]=useState({})
   let [allData,setAllData]=useState([])
   let allRows=[]
        const location = useLocation();
        useEffect( () => {
        
        try{
          if(location.state)
       {   let user1=location.state.user;
          setUser(user1)
          console.log(user1)
        }
        }
        
        catch(error){
            console.log(error)
        }
         axios.get("http://localhost:9002/requests")
            .then( res => {
                setAllData(res.data.data)
            })
            .catch(res=>{console.log(res.message)})    
        
      },[]);

  const navigate = useNavigate();
  const submitHandler=()=>{
     navigate('/requestsData/add',{ state: { user:user }})
  }
  function deleteCall(id){
    console.log('delete called')
    axios.delete("http://localhost:9002/requestsDelete/"+id)
    .then(res=>console.log(res.data));

    axios.get("http://localhost:9002/requests/")
            .then( res => {
                setAllData(res.data.data)
            })
            .catch(res=>{console.log(res.message)})    
  }
   function setBody(){    
      allData.map(function(eachData){
        if(user._id===eachData._id)
        {
          eachData.ownerRequests.map(function(pgreq){
             allRows.push(
            <tr key={pgreq._id} className="contentTr">
                      <td className="width30">{pgreq.reqType}</td>
                      <td className="width30">{pgreq.location}</td>
                      <td className="width40">{pgreq.conditions}</td>
                      <td className="width35"> <button onClick={()=>deleteCall(pgreq._id)}>Delete</button> </td>
                    </tr>
         )

          })
         

        }
         

      })
      return allRows;
   }

  return(
    <div>
        <Navbar/>
        <div className='listAllData'>
            <div className='titleBar'>
                <span className='myTitle'>MY REQUESTS:</span>
                <button className='addBtn' onClick={submitHandler}><GrAdd size={25}/></button>
            </div>
             <table className="myTable ">
            <thead>
                <tr>
                   
                   <th className="width30"> TYPE </th>
                   <th className="width30"> LOCATION </th>
                   <th className="width35"> CONDITIONS </th>
                   <th className="width35"> Click to Delete </th>
                </tr>
            </thead>
                 <tbody>                        
                    {setBody()}
                 </tbody>
            </table>
            </div>
    </div>);
}

export default MyRequests;
