import React,{useState,useEffect} from 'react';
import Navbar from './Navbar';
import axios from "axios";
import { useForm } from "react-hook-form";


function HousesforSale() {
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
    pics:""
  }
  useEffect( () => {
           axios.get("http://localhost:9002/houses")
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
                    eachData.houseSale.map(function(house){
                      // console.log('inside')
                      // console.log(house)
                      eachRow={
                        id:house._id,
                        fname:eachData.fname+" "+eachData.lname,
                        email:eachData.email,
                        address:house.address,
                        specs:house.specs,
                        area:house.area,
                        cpm:house.cpSqFeet,
                        city:house.city,
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
        if(data.searchCity!==''&&data.area==='')
        {
          allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.houseSale.map(function(house){
                      console.log('inside')
                      console.log(house)
                      if(house.city.toLowerCase()===data.searchCity.toLowerCase()||house.state.toLowerCase()===data.searchCity.toLowerCase())
                      {
                        newdata={
                        _id:eachData._id,
                        fname:eachData.fname,
                        lname:eachData.lname,
                        email:eachData.email,
                        houseSale:[{
                          address:house.address,
                          specs:house.specs,
                        area:house.area,
                        cpSqFeet:house.cpSqFeet,
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
        else if(data.searchCity===''&&data.area!=='')
        {
          allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.houseSale.map(function(house){
                      // console.log('inside')
                      // console.log(house)
                      if(house.area<=data.area)
                      {
                        newdata={
                        _id:eachData._id,
                        fname:eachData.fname,
                        lname:eachData.lname,
                        email:eachData.email,
                        houseSale:[{
                          address:house.address,
                          specs:house.specs,
                        area:house.area,
                        cpSqFeet:house.cpSqFeet,
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
        else if(data.searchCity!==''&&data.area!==''){
          allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.houseSale.map(function(house){
                      console.log('inside equal')
                      // console.log(house)
                      if(house.area<=data.area&&(house.city.toLowerCase()===data.searchCity.toLowerCase()||house.state.toLowerCase()===data.searchCity.toLowerCase()))
                      {
                                              console.log('inside 3 equal')
                        newdata={
                        _id:eachData._id,
                        fname:eachData.fname,
                        lname:eachData.lname,
                        email:eachData.email,
                        houseSale:[{
                          address:house.address,
                          specs:house.specs,
                        area:house.area,
                        cpSqFeet:house.cpSqFeet,
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
                <p id='col2'>Area </p>
                <input 
                type="text"
                name="area"
                className='inputNameS'
                {...register("area")}/>
            </div>
            <input type="submit" value="Search House" id='searchBtn'/>
          </div>
          
        </form>
      <div className='listAll'>
        <table className="table-users ">
            <thead>
                <tr>
                   <th className="width8"> NAME </th>
                   <th className="width12"> EMAIL </th>
                   <th className="width30"> ADDRESS </th>
                   <th className="width8"> CITY </th>
                   <th className="width8"> STATE </th>
                   <th className="width20"> SPECIFICATIONS </th>
                   <th className="width7"> AREA </th>
                   <th className="width7"> Cost Per Sq Feet </th>
                </tr>
            </thead>
                 <tbody>{setBody()}
                 </tbody>
            </table>
      </div>
    </div>);
}

export default HousesforSale;
