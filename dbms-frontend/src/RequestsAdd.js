import React,{useEffect,useState} from 'react';
import Navbar from './Navbar';
import { useForm } from "react-hook-form";
import './houses.css'
import axios from "axios"
import {
  BrowserRouter as Router,  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import styled from "styled-components";

const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 100vh;
`;

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;
function RequestsAdd() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
        let [user,setUser]=useState({})
        const navigate = useNavigate();
        const location = useLocation();
        let user1={}
        useEffect( () => {        
        try{
            if(location.state)
            {   
                user1=location.state.user;
                setUser(user1)
                console.log('user in req add')
                console.log(user1)
                localStorage.setItem('curUserObj',JSON.stringify(user1))
              }
            }
        
        catch(error){
            console.log(error)
        }
        
      }, []);
      
      const [isOpen, setIsOpen] = useState(false);
      const options = ["Rent", "Buy", "PG","Roommates"];
      const [selectedOption, setSelectedOption] = useState(options[0]);
      let newRequest={}

      const toggling = () => setIsOpen(!isOpen);

      const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
        console.log(selectedOption);
      };
      function submitForm(data) {
        // console.log(data)
        // console.log(user1)
        var retrievedObject = localStorage.getItem('curUserObj');
                console.log('user in req add')
      user1=JSON.parse(retrievedObject)
        // console.log(data)
        console.log(user1)
        newRequest={
            ...data,
            reqType:selectedOption,
            user:user1._id
        }
        console.log('newRequest')
        console.log(newRequest)
        axios.post("http://localhost:9002/requestsData/add", newRequest)
            .then( res => {
                alert(res.data.message)
                navigate("/requestsData")
            })
      }
  return (<div>
    <Navbar/>
    <div className="mainContainer">
        <div className="headings">
          <h3>PLACE REQUEST</h3>      
        </div>
        <div className='addNewApp'>
          <form onSubmit={handleSubmit(submitForm)}>
          <div className='firstLine'>
             <div className='hName'>
                <p id='col1'>What are you looking for? </p>
                <DropDownContainer>
                <DropDownHeader onClick={toggling}>
                  {selectedOption || "Rent"}
                </DropDownHeader>
                {isOpen && (
                  <DropDownListContainer>
                    <DropDownList>
                      {options.map(option => (
                        <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                          {option}
                        </ListItem>
                      ))}
                    </DropDownList>
                  </DropDownListContainer>
                )}
            </DropDownContainer>
            </div>
            <div className='addressDetails'>
                <p id='col1'>Location </p>
                <input 
                type="text"
                name="location"
                className='inputAddress'
                {...register("location", {
                required:true,
                }
                )}/>
                {errors.location && errors.location.type === "required" && (
                    <p className='warning'>Location is required.</p>
                )}
                {errors.location && errors.location.type === "value" && (
                    <p className='warning'>Location is wrong.</p>
                )}
            </div>
          </div>
          <div className='thirdLine'>
                <div className='specDetails1'>
                <p id='col1'>Conditions: </p>
                <input 
                type="text"
                name="conditions"
                className='inputSpecs'
                {...register("conditions", {
                required:true
                }
                )}/>
                {errors.conditions && errors.conditions.type === "required" && (
                    <p className='warning'>Conditions is required.</p>
                )}
            </div>
          </div>                     
          <input type="submit" value="Add Request" id='addHouseBtn'/>
        </form>
        </div>
    </div>
    
    </div>);
}

export default RequestsAdd;
