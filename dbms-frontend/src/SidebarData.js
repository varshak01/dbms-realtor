import React from 'react';
import { BsFillHouseDoorFill } from "react-icons/bs";
import { MdApartment } from "react-icons/md";
import { GoRequestChanges } from "react-icons/go";

export const SidebarData=[
    {
        title:'Houses',
        path:'/houses',
        icon:<BsFillHouseDoorFill size={23}/>,
        cName:'nav-text'
    },
    {
        title:'PGs',
        path:'/PGs',
        icon:<MdApartment size={23}/>,
        cName:'nav-text'
    },
    {
        title:'Requests',
        path:'/requests',
        icon:<GoRequestChanges size={23}/>,
        cName:'nav-text'
    }
]
