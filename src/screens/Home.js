import React, { useEffect, useState } from 'react';
import Navber from '../components/Navber';
import axios from 'axios';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rooms, setRooms] = useState([]);
  
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const data = (await axios.get('/api/rooms/getallrooms')).data; 
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    } 
    fetchMyAPI();
  }, []);


  
  return (
    <div>
      <Navber />
      <h2>saurav</h2>
    </div>
  );
};

export default Home;
