import React,{useEffect} from 'react';
import { Tabs } from 'antd';
import Navber from '../components/Navber';
import MyBooking from './MyBooking';
import Booking from './Booking';


const { TabPane } = Tabs;
const Profile = () => {
    function callback(key) {
        console.log(key);
    } 
  const user = JSON.parse(localStorage.getItem("currentUser"));
   
   useEffect(() => {
       if(!user){
          window.location.href = "/login"
       }
   },[])

  return (
    <div>
      <Navber /> 
      <div className="mt-3 p-3 w-50">
          <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Profile" key="1">
        <div className="row">
            <div className="col-xs-12">
              <div className="bs profile__data"  >
                <h1>My Profile</h1>
                <br />
                <h4>Name :  {user.name}</h4>
                <h4>Email :  {user.email}</h4> 
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Booking" key="2"> 
            <MyBooking />
        </TabPane>
      </Tabs>
      </div> 
    </div>
  );
};

export default Profile;
