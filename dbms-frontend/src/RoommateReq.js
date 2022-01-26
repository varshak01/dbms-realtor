import React from 'react';
import './houses.css';

function RoommateReq({rmreqs}) {
   // console.log('rmreqs');
   // console.log(rmreqs)
   let allRows=[]
   function setBody(){
      rmreqs.map(function(rmreq){
         allRows.push(
            <tr key={rmreq.id} className="contentTr">
                      <td className="width15">{rmreq.fname}</td>
                      <td className="width20">{rmreq.email}</td>
                      <td className="width15">{rmreq.phNumber}</td>
                      <td className="width20">{rmreq.location}</td>
                      <td className="width30">{rmreq.conditions}</td>
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
                 <tbody>{setBody()}  
                 </tbody>
            </table>
            </div>);
}

export default RoommateReq;
