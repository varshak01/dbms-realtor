import React, { useState } from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';
import './houses.css'
import HousesforRent from './HousesforRent';
import HousesforSale from './HousesforSale';
import Navbar from './Navbar';
function Houses() {
  const [page1, setPage1]=useState(1)
  const [page2, setPage2]=useState(0)

  function submitSale(){    
    console.log('sale called')
      if(page1===1&&page2===0)
      { 
        return
      }
      else if(page1===0&&page2===1)
      {
        setPage1(1)
        setPage2(0)
      }
   
  }
  function submitRent(){
    if(page2===1&&page1===0)
      { 
        return
      }
      else if(page2===0&&page1===1)
      {
        setPage2(1)
        setPage1(0) 
      }
     
  }
  function mainPage(){
    if(page1===1&&page2===0)
        return <HousesforSale/>
    else
        return  <HousesforRent/>
  }
  return(
    <div className='body'>
    <Navbar/>
     <div className='housePage'>
      <div className='optionsButton'>
        <button id='btn' onClick={submitSale} autofocus>HOUSES FOR SALE</button>
        <button id='btn' onClick={submitRent}>HOUSES FOR RENT</button>
        {
          mainPage()
        }
        
        
      </div>
    </div>
    </div>
  )
   
}

export default Houses;
