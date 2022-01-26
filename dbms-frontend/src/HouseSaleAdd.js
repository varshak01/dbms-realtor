import React from 'react';
import Navbar from './Navbar';
import axios from "axios"

import { useForm } from "react-hook-form";
import {useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import {
  BrowserRouter as Router,  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
function HouseSaleAdd() {
   const { register, handleSubmit, watch, formState: { errors } } = useForm();
   let [user,setUser]=useState({})
          const navigate = useNavigate();
        const location = useLocation();
        let user1={}
        let house={}
        useEffect( () => {        
        try{
            if(location.state)
            {   
                user1=location.state.user;
                setUser(user1)
                console.log('user in add')
                console.log(user1)
                localStorage.setItem('curUserObj',JSON.stringify(user1))
            }
            }
        
        catch(error){
            console.log(error)
        }
        
      }, []);
    
    function submitForm(data) {
        // console.log(data)
        // console.log(user1)
        var retrievedObject = localStorage.getItem('curUserObj');
                console.log('user in sale add')
      user1=JSON.parse(retrievedObject)
        // console.log(data)
        console.log(user1)
        house={
            ...data,
            user:user1._id
        }
        console.log('house')
        console.log(house)
        axios.post("http://localhost:9002/houseSale/add", house)
            .then( res => {
                alert(res.data.message)
                navigate("/houseSale")
            })
    }
  return (<div>
    <Navbar/>
    <div className="mainContainer">
        <div className="headings">
          <h3>SELL HOUSE</h3>      
        </div>
        <div className='addNewApp'>
          <form onSubmit={handleSubmit(submitForm)}>
          <div className='firstLine'>
             <div className='hName'>
                <p id='col1'>House/Apartment Name </p>
                <input 
                type="text"
                name='nameOfHouse'
                className='inputName'
                {...register("nameOfHouse", {
                required:true,
                minLength:4
                }
                )}/>
                {errors.nameOfHouse && errors.nameOfHouse.type === "required" && (
                    <p className='warning'>Name Of House/Apartment is required.</p>
                )}
                {errors.nameOfHouse && errors.nameOfHouse.type === "minLength" && (
                    <p className='warning'>Minimum length: 4</p>
                )}
            </div>
            <div className='addressDetails'>
                <p id='col1'>Address </p>
                <input 
                type="text"
                name="address"
                className='inputAddress'
                {...register("address", {
                required:true
                }
                )}/>
                {errors.address && errors.address.type === "required" && (
                    <p className='warning'>Address is required.</p>
                )}
            </div>
          </div>
          <div className='secondLine'>
                <div className='cityDetails'>
                    <p id='col1'>City </p>
                    <input 
                    type="text"
                    name='city'
                    className='inputCity'
                    {...register("city", {
                        required:true    })}/>
                    {errors.city && errors.city.type === "required" && (
                            <p className='warning'>City of house required.</p>
                        )}
                </div>
                <div className='stateDetails'>
                    <p id='col1'>State </p>
                    <input
                    type="text"
                    name="state"
                    className='inputState'
                    {...register("state", {
                        required:true
                        })}/>
                    {errors.state && errors.state.type === "required" && (
                            <p className='warning'>State required.</p>
                        )}
                </div>
                <div className='pincodeDatils'>
                    <p id='col1'>Pincode </p>
                    <input
                    type="text"
                    name="pincode"
                    className='inputPincode'
                    {...register("pincode", {
                        required:true
                        })}/>
                    {errors.pincode && errors.pincode.type === "required" && (
                            <p className='warning'>Pincode required.</p>
                        )}
                </div>
          </div>
          <div className='thirdLine'>
                <div className='area'>
                <p id='col1'>AREA (in square feet) </p>
                <input 
                type="decimal"
                name='area'
                className='inputArea'
                {...register("area", {
                required:true
                }
                )}/>
                {errors.area && errors.area.type === "required" && (
                    <p className='warning'>Name Of House/Apartment is required.</p>
                )}
                <p id='col1'>BUILT UP AREA (in square feet) </p>
                <input 
                type="decimal"
                name='buArea'
                className='inputArea'
                {...register("buArea", {
                required:true
                }
                )}/>
                {errors.buArea && errors.buArea.type === "required" && (
                    <p className='warning'>Name Of House/Apartment is required.</p>
                )}
                <p id='col1'>Cost Per Sq. Feet </p>
                <input 
                type="decimal"
                name='cpSqFeet'
                className='inputCost'
                {...register("cpSqFeet", {
                required:true
                }
                )}/>
                {errors.cpm && errors.cpm.type === "required" && (
                    <p className='warning'>Cost Per Sq. Feet is required.</p>
                )}
            </div>
                <div className='specDetails'>
                <p id='col1'>Specifications/Amenities </p>
                <input 
                type="text"
                name="specs"
                className='inputSpecs'
                {...register("specs", {
                required:true
                }
                )}/>
                {errors.specs && errors.specs.type === "required" && (
                    <p className='warning'>Specifications is required.</p>
                )}
            </div>
          </div>
           
            
            
                
          <input type="submit" value="Add House" id='addHouseBtn'/>
        </form>
        </div>
    </div>
    </div>);
}

export default HouseSaleAdd;
