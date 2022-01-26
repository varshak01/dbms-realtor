import './App.css';
import Dashboard from './Dashboard';
import {
  BrowserRouter as Router,  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
import HousesforSale from './HousesforSale';
import HousesforRent from './HousesforRent';
import PGsList from './PGsList';
import RequestsList from './RequestsList';
import Houses from './Houses';
import MyHouseForRent from './MyHouseForRent';
import MyHouseForSale from './MyHouseForSale';
import MyPG from './MyPG';
import MyRequests from './MyRequests';
import HouseSaleAdd from './HouseSaleAdd';
import HouseRentAdd from './HouseRentAdd';
import PGadd from './PGadd';
import RequestsAdd from './RequestsAdd';
import Homepage from "./Homepage"
import Login from "./Login"
import Register from "./Register"
import {useState} from 'react'

function App() {
  // const [ user, setLoginUser] = useState({})
  // function checkPage () {
    
  //   if(user&&user._id)
  //   return <Dashboard/>
  //   else
  //   return <Login/>
    
  //       } 
  return (
    <div className="App">
      <Router>
        <Routes>
        
          <Route exact path="/" element={<Login/>}>
          </Route>
          <Route exact path="/dashboard" element={<Dashboard/>}>
          </Route>
          <Route exact path="/register" element={<Register />}>
          </Route>
          <Route exact path="/houses" element={<Houses/>} />
          <Route exact path="/houses/sale" element={<HousesforSale/>} />
          <Route exact path="/PGs" element={<PGsList/>} />
          <Route exact path="/requests" element={<RequestsList/>} />
          <Route exact path="/houseRent" element={<MyHouseForRent/>} />
          <Route exact path="/houseSale" element={<MyHouseForSale/>} />
          <Route exact path="/pgData" element={<MyPG/>} />
          <Route exact path="/requestsData" element={<MyRequests/>} />
          <Route exact path="/houseSale/add" element={<HouseSaleAdd/>} />
          <Route exact path="/houseRent/add" element={<HouseRentAdd/>} />
          <Route exact path="/pgData/add" element={<PGadd/>} />
          <Route exact path="/requestsData/add" element={<RequestsAdd/>} />
        </Routes>    
      </Router>
    </div>
  );
}

export default App;
