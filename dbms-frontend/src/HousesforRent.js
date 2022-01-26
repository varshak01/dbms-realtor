import React,{useState,useEffect} from 'react';
import Navbar from './Navbar';
import axios from "axios"
import { useForm } from "react-hook-form";

function HousesforRent() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  let houses=[]
  let [allData,setAllData]=useState([])
  const [backupData, setBackupData]=useState([])
  let house={}
  let eachRow={
    id:"",
    fname:"",
    email:"",
    address:"",
    specs:"",
    area:"",
    cpm:"",
    city:""
  }
  useEffect( () => {
           axios.get("http://localhost:9002/houses/rent")
            .then( res => {
                setAllData(res.data.data)
                setBackupData(res.data.data)
                localStorage.setItem('allData',JSON.stringify(res.data.data))
            })
            .catch(res=>{console.log(res.message)})        
      }, []);
      
      function setBody(){        
        let allRows=[]
        allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.houseRent.map(function(house){
                      // console.log('inside')
                      // console.log(house)
                      eachRow={
                        id:house._id,
                        fname:eachData.fname+" "+eachData.lname,
                        email:eachData.email,
                        address:house.address,
                        specs:house.services,
                        area:house.area,
                        cpm:house.cpm,
                        city:house.city,
                        state:house.state
                      }
                      allRows.push(eachRow)

                   

                    }
                  )
                  
                })
                let rows=[]
        allRows.map(function(row){
                  
                  // console.log('row')
                  // console.log(row)
                  rows.push(
                    <tr key={row.id} className="contentTr">
                    <td className="width8">{row.fname}</td>
                    <td className="width12">{row.email}</td>
                    <td className="width25">{row.address}
                    </td>
                    <td className="width8">{row.city}</td>
                    <td className="width8">{row.state}</td>
                    <td className='width25'>{row.specs}</td>
                    <td className="width7">{row.area}</td>
                    <td className="width7">{row.cpm}</td>
                    </tr>)

                })
          
                
                return rows

      }
      function submitForm(data){    
        // console.log(data)  
        let newData=[] 
        let newdata={}
        allData=backupData;
        if(data.searchCity==='')
        {
          console.log('reset')
          setAllData(backupData)
        }
        if(data.searchCity!==''&&data.RentPM==='')
        {
          allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.houseRent.map(function(house){
                      // console.log('inside')
                      // console.log(house)
                      if(house.city.toLowerCase()===data.searchCity.toLowerCase()||house.state.toLowerCase()===data.searchCity.toLowerCase())
                      {
                        newdata={
                        _id:eachData._id,
                        fname:eachData.fname,
                        lname:eachData.lname,
                        email:eachData.email,
                        houseRent:[{
                          address:house.address,
                        services:house.services,
                        area:house.area,
                        cpm:house.cpm,
                        city:house.city,
                        state:house.state

                        }]                    

                        }
                        newData.push(newdata)
                      }                

                    }
                  )
                  
                })     
            setAllData(newData)  
            // data=[]
          
        }
        else if(data.searchCity===''&&data.RentPM!=='')
        {
          allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.houseRent.map(function(house){
                      // console.log('inside')
                      // console.log(house)
                      if(house.cpm<=data.RentPM)
                      {
                        newdata={
                        _id:eachData._id,
                        fname:eachData.fname,
                        lname:eachData.lname,
                        email:eachData.email,
                        houseRent:[{
                          address:house.address,
                        services:house.services,
                        area:house.area,
                        cpm:house.cpm,
                        city:house.city,
                        state:house.state

                        }]                    

                        }
                        newData.push(newdata)
                      }                

                    }
                  )
                  
                })     
            setAllData(newData)  
            // data=[]
          
        }
        else{
          allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.houseRent.map(function(house){
                      // console.log('inside')
                      // console.log(house)
                      if(house.cpm<=data.RentPM&&(house.city.toLowerCase()===data.searchCity.toLowerCase()||house.state.toLowerCase()===data.searchCity.toLowerCase()))
                      {
                        newdata={
                        _id:eachData._id,
                        fname:eachData.fname,
                        lname:eachData.lname,
                        email:eachData.email,
                        houseRent:[{
                          address:house.address,
                        services:house.services,
                        area:house.area,
                        cpm:house.cpm,
                        city:house.city,
                        state:house.state

                        }]                    

                        }
                        newData.push(newdata)
                      }                

                    }
                  )
                  
                })     
            setAllData(newData)  
            // data=[]
          
        }

      }

  return(
    <div>
    <form onSubmit={handleSubmit(submitForm)}>
          <div className='firstLine'>
          <p className='filterBy'>Filter by:</p>
             <div className='hName'>
                <p id='col2'>City/State </p>
                <input 
                type="text"
                name='searchCity'
                className='inputNameS'
                {...register("searchCity")}/>
            </div>
            <div className='addressDetails'>
                <p id='col2'>Rent Per Month </p>
                <input 
                type="text"
                name="RentPM"
                className='inputNameS'
                {...register("RentPM")}/>
            </div>
            <input type="submit" value="Search House" id='searchBtn'/>
          </div>
          
        </form>
     
      <div className='listAll'>
        <table className="table-houses ">
            <thead>
                <tr>
                   <th className="width8"> NAME </th>
                   <th className="width12"> EMAIL </th>
                   <th className="width25"> ADDRESS </th>
                   <th className="width8"> CITY </th>
                   <th className="width8"> STATE </th>
                   <th className="width25"> SPECIFICATIONS </th>
                   <th className="width7"> AREA </th>
                   <th className="width7"> Cost Per Month </th>
                </tr>
            </thead>
              <tbody>
               { setBody() }
              </tbody>
                 
            </table>
      </div>
    </div>
  )
}
// {houses.map((house) => (
                        
//                     <tr key={house._id} className="contentTr">
//                     <td className="width25">{house.nameOfHouse}</td>
//                     <td className="width25">{house.pincode}</td>
//                     <td className="width25">{app.ownerEmailID}</td>
//                     <td className="width25">
//                         <button 
//                         className="updateBtn"
//                         onClick={() => {
//                             {editSubmitHandle(app)}
//                           }}
//                         >Update</button>
//                         <button className="deleteBtn" onClick={() => {
//                             {deleteApplication(app,app.id)}
//                           }}>Delete</button>
//                     </td>
//                     </tr>
//                     ))}

export default HousesforRent;
