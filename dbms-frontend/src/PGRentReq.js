import React from 'react';
import './houses.css';
import { useForm } from "react-hook-form";

export default function PGRentReq({pgreqs}) {
          const { register, handleSubmit, watch, formState: { errors } } = useForm();

   // console.log('pgreqs');
   // console.log(pgreqs)
   let allRows=[]
   function setBody(){
      pgreqs.map(function(pgreq){
         allRows.push(
            <tr key={pgreq.id} className="contentTr">
                      <td className="width15">{pgreq.fname}</td>
                      <td className="width20">{pgreq.email}</td>
                      <td className="width15">{pgreq.phNumber}</td>
                      <td className="width20">{pgreq.location}</td>
                      <td className="width30">{pgreq.conditions}</td>
                    </tr>
         )

      })
      return allRows;
   }
  return(<div className='rqPage'>
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
