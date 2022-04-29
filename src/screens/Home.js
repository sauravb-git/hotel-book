import React, { useEffect, useState } from 'react';
import Navber from '../components/Navber';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import Error from './../components/Error';
 
const { RangePicker } = DatePicker;



const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rooms, setRooms] = useState([]);

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState(); 
  const [duplicaterooms, setDuplicaterooms] = useState([]);


  const [searchkey,setSearchkey] = useState("");
  
  const [type, setType] = useState("all");

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const data = (await axios.get('rooms/getallrooms')).data;
        console.log(data);
        setRooms(data);
        setLoading(true);
        setDuplicaterooms(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchMyAPI();
  }, []);

  function filterByDate(dates) {
    try {
      setFromDate(moment(dates[0]).format('DD-MM-YYYY'));
      setToDate(moment(dates[1]).format('DD-MM-YYYY'));

      var tempRooms = [];
      for (const room of duplicaterooms) {
        var availability = false;
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            if (
              !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(
                booking.fromdate,
                booking.todate
              ) &&
              !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(
                booking.fromdate,
                booking.todate
              )
            ) {
              if ( 
              moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate && 
              moment(dates[0]).format('DD-MM-YYYY') !== booking.todate && 
              moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate && 
              moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
              ) {
                availability = true;
              }
            }
          }
        }
        
        if (availability == true || room.currentbookings.length == 0) {
          tempRooms.push(room);
        }
      }
      setRooms(tempRooms);
    } catch (error) {
      
    }
  }

  const filterBySearch = () => {
     const tempRoom =  duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
     setRooms(tempRoom)
  }

  
  const  filterByType = (type) => { 
  setType(type);
  console.log(type);
  if (type !== "all") {
    const tempRooms = duplicaterooms.filter(
      (x) => x.type.toLowerCase() == type.toLowerCase()
    );
    setRooms(tempRooms);
  } else {
    setRooms(duplicaterooms);
  }
}
  return (
    <div>
      <Navber />
      <div className="container">


        <div   className="row mt-5 bs w-75 m-auto"  style={{ padding: '0', margin: '0', textAlign: 'center' }}   >
          <div className="col-md-3">
            <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
          </div>
          
          <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms" 
            value={searchkey}
            onChange={(e) => {setSearchkey(e.target.value)}} 
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>

        </div>




        <div
          className="row justify-content-center mt-3"
          style={{ padding: '0', margin: '0', textAlign: 'center' }}
        >
          {loading ? (<Loader />) :  (
            rooms.map((x, i) => {
              return (
                <div key={i} className="col-md-9 mt-3" data-aos="flip-down">
                  <Room room={x} fromDate={fromDate} toDate={toDate} />
                </div>
              );
            })
          ) }
        </div>
      </div>
    </div>
  );
};

export default Home;
