import React,{useEffect,useState} from 'react';
import Navbar from './Navbar';
import './houses.css'
import { GrAdd } from "react-icons/gr";
import {useLocation} from 'react-router-dom';
import {
  BrowserRouter as Router,  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
import axios from "axios"
// import { useFocusEffect } from '@react-navigation/native';

function MyHouseForRent() {
    const [user,setUser]=useState({})
   const [allData,setAllData]=useState([])
   let allRows=[]
        const location = useLocation();
        useEffect( () => {
      
            try{
              if(location.state)
              {   
                let user1=location.state.user;
                setUser(user1)
                console.log(user1)}
              }
              catch(error){
                console.log(error)
              }
              axios.get("http://localhost:9002/houses/rent")
               .then( res => {
                setAllData(res.data.data)
              })
                .catch(res=>{console.log(res.message)})  
      
        
            },[]);
  const navigate = useNavigate();
  const submitHandler=()=>{
     navigate('/houseRent/add',{ state: { user:user }})
  }
  function setBody(){    
    
      allData.map(function(eachData){
        if(user._id===eachData._id)
        {
          eachData.houseRent.map(function(row){
             allRows.push(
            <tr key={row._id} className="contentTr">
                    <td className="width30">{row.address}
                    </td>
                    <td className="width8">{row.city}</td>
                    <td className="width8">{row.state}</td>
                    <td className='width30'>{row.services}</td>
                    <td className="width8">{row.area}</td>
                    <td className="width8">{row.cpm}</td>
                    <td className="width8"> <button onClick={()=>deleteCall(row._id)}>Delete</button> </td>
                    </tr>
         )

          })
         

        }
         

      })
      return allRows;
   }
   function deleteCall(id){
    console.log('delete called')
    axios.delete("http://localhost:9002/rentDelete/"+id)
    .then(res=>console.log(res.data));

    axios.get("http://localhost:9002/houses/rent")
            .then( res => {
                setAllData(res.data.data)
            })
            .catch(res=>{console.log(res.message)})    
  }
  return (
    <div>
        <Navbar/>
        <div className='listAllData'>
            <div className='titleBar'>
                <span className='myTitle'>MY HOUSES FOR RENT :</span>
                <button className='addBtn' onClick={submitHandler}><GrAdd size={25}/></button>
            </div>
        <table className="myTable ">
            <thead>
                <tr>
                   <th className="width30"> ADDRESS </th>
                   <th className="width8"> CITY </th>
                   <th className="width8"> STATE </th>
                   <th className="width30"> SPECIFICATIONS </th>
                   <th className="width8"> AREA </th>
                   <th className="width8"> Cost Per Month </th>
                   <th className="width8"> Click to Delete </th>
                </tr>
            </thead>
                 <tbody>                        
                    {setBody()}
                 </tbody>
            </table>
      </div>
    </div>
    );
}
export default MyHouseForRent;
