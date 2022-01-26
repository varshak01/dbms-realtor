import React from 'react';
import Navbar from './Navbar';
import './houses.css'
import { GrAdd } from "react-icons/gr";
import {useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import {
  BrowserRouter as Router,  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
import axios from "axios"
function MyPG() {
  const [user,setUser]=useState({})
  const [allData,setAllData]=useState([])
   let allRows=[]
        const location = useLocation();
        useEffect( () => {
        
        try{
          if(location.state)
       {   let user1=location.state.user;
          setUser(user1)
          console.log(user1)}
        }
        
        catch(error){
            console.log(error)
        }
        axios.get("http://localhost:9002/pgs")
            .then( res => {
                setAllData(res.data.data)
            })
            .catch(res=>{console.log(res.message)})  
        
      }, []);
  const navigate = useNavigate();
  const submitHandler=()=>{
     navigate('/pgData/add',{ state: { user:user }})
  }
  function setBody(){    
      allData.map(function(eachData){
        if(user._id===eachData._id)
        {
          eachData.ownerPG.map(function(row){
             allRows.push(
            <tr key={row._id} className="contentTr">
                    <td className="width10">{row.nameOfHouse}</td>
                    <td className="width25">{row.address}
                    </td>
                    <td className="width7">{row.city}</td>
                    <td className="width8">{row.state}</td>
                    <td className='width25'>{row.services}</td>
                    <td className='width8'>{row.peoplePerRoom}</td>
                    <td className="width8">{row.costPM}</td>
                    <td className="width10"><button onClick={()=>deleteCall(row._id)}>Delete</button></td>
                    </tr>
         )

          })
         

        }
         

      })
      return allRows;
   }
   function deleteCall(id){
    console.log('delete called')
    axios.delete("http://localhost:9002/pgsDelete/"+id)
    .then(res=>console.log(res.data));

    axios.get("http://localhost:9002/pgs/")
            .then( res => {
                setAllData(res.data.data)
            })
            .catch(res=>{console.log(res.message)})    
  }
  return (
    <div>
        <Navbar/>
        <div className='listAll'>
            <div className='titleBar'>
                <span className='myTitle'>MY PGs:</span>
                <button className='addPGBtn' onClick={submitHandler}><GrAdd size={25}/></button>
            </div>
            <div className='listAllData'>
             <table className="myPGTable">
            <thead>
                 <tr>
                   <th className="width10"> NAME OF PG </th>
                   <th className="width25"> ADDRESS </th>
                   <th className="width7"> CITY </th>
                   <th className="width8"> STATE </th>
                   <th className="width25"> SPECIFICATIONS </th>
                   <th className="width8"> PEOPLE PER ROOM </th>
                   <th className="width8"> COST PER PERSON PER MONTH </th>
                   <th className="width10"> Click to Delete </th>
             
                </tr>
            </thead>
                 <tbody>                        
                   {setBody()}
                 </tbody>
            </table>
            </div>
            </div>
    </div>);
}

export default MyPG;
