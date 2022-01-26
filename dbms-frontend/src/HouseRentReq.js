import React from 'react';
import './houses.css';
import { useForm } from "react-hook-form";

function HouseRentReq({rentreqs}) {
          const { register, handleSubmit, watch, formState: { errors } } = useForm();
   // console.log('renteqs');
   // console.log(rentreqs)
   let allRows=[]
   function setBody(){
      rentreqs.map(function(rentreq){
         allRows.push(
            <tr key={rentreq.id} className="contentTr">
                      <td className="width15">{rentreq.fname}</td>
                      <td className="width20">{rentreq.email}</td>
                      <td className="width15">{rentreq.phNumber}</td>
                      <td className="width20">{rentreq.location}</td>
                      <td className="width30">{rentreq.conditions}</td>
                    </tr>
         )

      })
      return allRows;

   }

  return  (<div className='rqPage'>
             <table className="table-rqs ">
            <thead>
                <tr>
                   <th className="width15"> NAME </th>
                   <th className="width20"> EMAIL ADDRESS </th>
                   <th className="width15"> CONTACT NUMBER </th>
                   <th className="width20"> LOCATION </th>
                   <th className="width30"> CONDITIONS </th>
                </tr>
            </thead>
            <tbody>                        
                    {setBody()}
                 </tbody>
            </table>
            </div>);
}
export default HouseRentReq;

