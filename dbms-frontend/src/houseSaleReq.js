import React from 'react';
import './houses.css';
import { useForm } from "react-hook-form";


function HouseSaleReq({salereqs}) {
       const { register, handleSubmit, watch, formState: { errors } } = useForm();

   // console.log('salereqs');
   // console.log(salereqs)
   let allRows=[]
   function setBody(){
      salereqs.map(function(salereq){
         allRows.push(
            <tr key={salereq.id} className="contentTr">
                      <td className="width15">{salereq.fname}</td>
                      <td className="width20">{salereq.email}</td>
                      <td className="width15">{salereq.phNumber}</td>
                      <td className="width20">{salereq.location}</td>
                      <td className="width30">{salereq.conditions}</td>
                    </tr>
         )

      })
      return allRows;

   }
   function submitForm(data){}
  return (

     <div className='rqPage'>
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

export default HouseSaleReq;
