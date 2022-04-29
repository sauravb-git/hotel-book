import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import Navber from '../../components/Navber';
import Booking from './Bookings';
import Room from './Room';
import AddRoom from './AddRoom';
import User from './User';
const { TabPane } = Tabs;

function callback(key) {
 
}
const Admin = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user || user.isAdmin === false) {
      window.location.href = '/';
    }
  }, []);
  return (
    <>
      <Navber />
      <div className="p-3">
        <div className="ml-3 mt-3 mr-3 bs ">
          <h1 className="text-center">Admin Panel</h1>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Bookings" key="1">
              <Booking />
            </TabPane>
            <TabPane tab="Rooms" key="2">
              <Room />
            </TabPane>
            <TabPane tab="Add Room" key="3">
              <AddRoom />
            </TabPane>
            <TabPane tab="Users" key="4">
              <User />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Admin;
