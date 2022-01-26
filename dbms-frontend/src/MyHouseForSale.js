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
function MyHouseForSale() {
const [user,setUser]=useState({})
   const [allData,setAllData]=useState([])
   let allRows=[]
   const location = useLocation();
        useEffect( () => {
        
        try{
          if(location.state)
       {   let user1=location.state.user;
          setUser(user1)
          console.log('in sale house mine')
          console.log(user1)}
        }
        
        catch(error){
            console.log(error)
        }
        axios.get("http://localhost:9002/houses")
            .then( res => {
                setAllData(res.data.data)
            })
            .catch(res=>{console.log(res.message)})  
        
      }, []);
  const navigate = useNavigate();
  const submitHandler=()=>{
     navigate('/houseSale/add',{ state: { user:user }})
  }
  function setBody(){    
      allData.map(function(eachData){
        if(user._id===eachData._id)
        {
          eachData.houseSale.map(function(row){
             allRows.push(
            <tr key={row._id} className="contentTr">
                    <td className="width30">{row.address}
                    </td>
                    <td className="width8">{row.city}</td>
                    <td className="width8">{row.state}</td>
                    <td className='width30'>{row.specs}</td>
                    <td className="width8">{row.area}</td>
                    <td className="width8">{row.cpSqFeet}</td>
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
    axios.delete("http://localhost:9002/saleDelete/"+id)
    .then(res=>console.log(res.data));

    axios.get("http://localhost:9002/houses/")
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
                <span className='myTitle'>MY HOUSES FOR SALE:</span>
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
                   <th className="width8"> Cost Per Sq Feet </th>
                   <th className="width8"> Click to Delete </th>
                </tr>
            </thead>
                 <tbody>                        
                    {setBody()}
                 </tbody>
            </table>
      </div>
    </div>);
}

export default MyHouseForSale;
