import React, { useEffect,useState } from 'react';
import Navbar from './Navbar';
import './houses.css';
import axios from "axios"
import { useForm } from "react-hook-form";
import HousesforRent from './HousesforRent';
import HousesforSale from './HousesforSale';
import './houses.css'
import RoommateReq from './RoommateReq';
import HouseSaleReq from './houseSaleReq';
import HouseRentReq from './HouseRentReq';
import PGRentReq from './PGRentReq';
function RequestsList() {
      const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [page1, setPage1]=useState(1)
  const [page2, setPage2]=useState(0)
  const [page3, setPage3]=useState(0)
  const [page4, setPage4]=useState(0)

    let houses=[]
  let [allData,setAllData]=useState([])
  const [backupData, setBackupData]=useState([])
  useEffect( () => {
           axios.get("http://localhost:9002/requests")
            .then( res => {
                setAllData(res.data.data)
                setBackupData(res.data.data)
            })
            .catch(res=>{console.log(res.message)})        
      }, []);
     let salereqs=[]
      let rentreqs=[]
      let pgreqs=[]
      let rmreqs=[]
      let newReq={
        fname:"",
        lname:"",
        email:"",
        phNumber:"",
        reqType:"",
        location:"",
        conditions:""
      }
      function segregrate()
      {
         
        
        allData.map(function(eachData){
          eachData.ownerRequests.map(function(req){
            
              newReq={
                id:req._id,
                fname:eachData.fname+" "+eachData.lname,
              lname:eachData.lname,
              email:eachData.email,
              phNumber:eachData.phNumber,
              reqType:req.reqType,
              location:req.location,
              conditions:req.conditions

              }
            if(req.reqType==='Rent')
            {
                rentreqs.push(newReq)
            }
            else if(req.reqType==='Buy')
            {
                salereqs.push(newReq)
            }
            else if(req.reqType==='PG')
            {
                pgreqs.push(newReq)
            }
            else
            {
              rmreqs.push(newReq)
            }
          })
        })

      }
      function submitSale(){
    console.log('sale called')
      if(page1===1)
      { 
        return
      }
      else if(page1===0)
      {
        setPage1(1)
        setPage2(0)
        setPage3(0)
        setPage4(0)
      }
   
  }
  function submitRent(){
    console.log('rent')
    if(page2===1)
      { 
        return
      }
      else if(page2===0)
      {
        setPage2(1)
        setPage1(0) 
        setPage3(0);
        setPage4(0)
      }
     
  }
  function submitPG(){
    if(page3===1)
      { 
        return
      }
      else if(page3===0)
      {
        setPage2(0)
        setPage1(0) 
        setPage3(1);
        setPage4(0)
      }

  }
  function submitRM(){
    if(page4===1)
      { 
        return
      }
      else if(page4===0)
      {
        setPage2(0)
        setPage1(0) 
        setPage3(0);
        setPage4(1)
      }

  }
  function mainPage(){
    segregrate()
    if(page1===1)
        return <HouseSaleReq salereqs={salereqs}/>
    else if(page2===1)
        return  <HouseRentReq rentreqs={rentreqs}/>
    else if(page3===1)
    return <PGRentReq pgreqs={pgreqs}/>
    else
    return <RoommateReq rmreqs={rmreqs}/>
  }
   function submitForm(data){    
        // console.log(data)  
        let newData=[] 
        let newdata={}
        allData=backupData;
        if(data.searchCity==='')
        {
          setAllData(backupData)
        }
        else if(data.searchCity!=='')
        {
          allData.map(function(eachData){
                  // console.log(eachData)
                    eachData.ownerRequests.map(function(house){
                      if(house.location.toLowerCase().includes(data.searchCity.toLowerCase()))
                      {
                        newdata={
                        _id:eachData._id,
                        fname:eachData.fname,
                        lname:eachData.lname,
                        email:eachData.email,
                        phNumber:eachData.phNumber,
                        ownerRequests:[{
                          reqType:house.reqType,
                          location:house.location,
                          conditions:house.conditions
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
        <div className='reqPage'>
        <span className='headingCat'>FIND PEOPLE WHO ARE LOOKING FOR :</span>
        <br></br>
         <div className='optionsButton'>
        <button id='btn1' onClick={submitSale}>HOUSES FOR SALE</button>
        <button id='btn1' onClick={submitRent}>HOUSES FOR RENT</button>
        <button id='btn1' onClick={submitPG}>PGs</button>
        <button id='btn1' onClick={submitRM}>ROOM MATES</button>
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
            <input type="submit" value="Search Request" id='searchBtn'/>
          </div>          
        </form>
        {
          mainPage()
        }
        
        
      </div>
    </div>
    </div>);
}

export default RequestsList;
