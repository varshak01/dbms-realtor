import React,{useState,useEffect} from 'react';
import Navbar from './Navbar';
import './houses.css'
import axios from "axios";
import { useForm } from "react-hook-form";

function PGsList() {
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
    cpm:"",
    city:"",
    peoplePerRoom:"",
    nameOfPG:""
  }
  useEffect( () => {
           axios.get("http://localhost:9002/pgs")
            .then( res => {
                setAllData(res.data.data)
                setBackupData(res.data.data)
            })
            .catch(res=>{console.log(res.message)})        
      }, []);
      function setBody(){
          let allRows=[]
          let rows=[]
        allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.ownerPG.map(function(house){
                      // console.log('inside')
                      // console.log(house)
                      eachRow={
                        id:house._id,
                        fname:eachData.fname+" "+eachData.lname,
                        email:eachData.email,
                        address:house.address,
                        specs:house.services,
                        cpm:house.costPM,
                        city:house.city,
                        peoplePR:house.peoplePerRoom,
                        nameOfPG:house.nameOfHouse,
                        state:house.state
                      }
                      allRows.push(eachRow)                  

                    }
                  )
                  
                })
        allRows.map(function(row){
                  
                  // console.log('row')
                  // console.log(row)
                  rows.push(
                    <tr key={row.id} className="contentTr">
                    <td className="width8">{row.fname}</td>
                    <td className="width12">{row.email}</td>
                    <td className="width8">{row.nameOfPG}</td>
                    <td className="width21">{row.address}
                    </td>
                    <td className="width8">{row.city}</td>
                    <td className="width8">{row.state}</td>
                    <td className='width21'>{row.specs}</td>
                    <td className='width8'>{row.peoplePR}</td>
                    <td className="width7">{row.cpm}</td>
                    </tr>)

                })
                return rows

      }
        function submitForm(data){    
        let newData=[] 
        let newdata={}
        allData=backupData;
        if(data.searchCity==='')
        {
          setAllData(backupData)
        }
        if(data.searchCity!==''&&data.costPM==='')
        {
          allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.ownerPG.map(function(house){
                      if(house.city.toLowerCase()===data.searchCity.toLowerCase()||house.state.toLowerCase()===data.searchCity.toLowerCase())
                      {
                        newdata={
                        _id:eachData._id,
                        fname:eachData.fname,
                        lname:eachData.lname,
                        email:eachData.email,
                        ownerPG:[{
                          address:house.address,
                          services:house.services,
                        costPM:house.costPM,
                        nameOfHouse:house.nameOfHouse,
                        peoplePerRoom:house.peoplePerRoom,
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
        else if(data.searchCity===''&&data.costPM!=='')
        {

          allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.ownerPG.map(function(house){
                      if(house.costPM<=data.costPM)
                      {
                        newdata={
                         _id:eachData._id,
                        fname:eachData.fname,
                        lname:eachData.lname,
                        email:eachData.email,
                        ownerPG:[{
                          address:house.address,
                          services:house.services,
                        costPM:house.costPM,
                        nameOfHouse:house.nameOfHouse,
                        peoplePerRoom:house.peoplePerRoom,
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
        else if(data.searchCity!==''&&data.costPM!==''){
                                        
          allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.ownerPG.map(function(house){
                      // console.log(house)
                      if(house.costPM<=data.costPM&&(house.city.toLowerCase()===data.searchCity.toLowerCase()||house.state.toLowerCase()===data.searchCity.toLowerCase()))
                      {
                        newdata={
                         _id:eachData._id,
                        fname:eachData.fname,
                        lname:eachData.lname,
                        email:eachData.email,
                        ownerPG:[{
                          address:house.address,
                          services:house.services,
                        costPM:house.costPM,
                        nameOfHouse:house.nameOfHouse,
                        peoplePerRoom:house.peoplePerRoom,
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
  return (
    <div>
        <Navbar/>
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
                <p id='col2'>Cost Per Person Per Room </p>
                <input 
                type="text"
                name="costPM"
                className='inputNameS'
                {...register("costPM")}/>
            </div>
            <input type="submit" value="Search PG" id='searchBtn'/>
          </div>
          
        </form>
            <div className='housePage'>
              <p className='headings1'>ALL PGs</p>
              <div className='listAll'>
             <table className="table-houses ">
            <thead>
                <tr>
                   <th className="width8"> NAME </th>
                   <th className="width12"> EMAIL </th>
                   <th className="width8"> NAME OF PG </th>
                   <th className="width21"> ADDRESS </th>
                   <th className="width8"> CITY </th>
                   <th className="width8"> STATE </th>
                   <th className="width21"> SPECIFICATIONS </th>
                   <th className="width8"> PEOPLE PER ROOM </th>
                   <th className="width7"> COST PER PERSON PER MONTH </th>
                </tr>
            </thead>
                 <tbody>                        
                   {setBody()}
                 </tbody>
            </table>
            </div>
          
          </div>
            
    </div>
);
}

export default PGsList;
