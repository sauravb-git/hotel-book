import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navber from '../components/Navber';
import { Modal, Button, Carousel } from 'react-bootstrap';
import Loader from './../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'
import {useParams} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
 
// ..
AOS.init({
  duration: 2000
});

const Booking = () => {
  let params = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [room, setRoom] = useState({});

  const [totalamount, setTotalAmount] = useState(0);
  const [totaldays, setTotalDays] = useState(0);

  const roomid =  params.roomid;
  const fromdate = moment(params.fromdate, 'DD-MM-YYYY');
  const todate = moment(params.todate, 'DD-MM-YYYY');

  useEffect(() => {
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    setTotalDays(totaldays);
    setTotalAmount(totaldays * room.rentperday);
  }, [room]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setLoading(true);
        const data = (
          await axios.post('rooms/getroombyid', { roomid: params.roomid })
        ).data;
        setRoom(data);
      } catch (error) {
        setLoading(false); 
      }
      setLoading(false);
    }
    fetchMyAPI();
  }, []);

 

  async function onToken(token){
       

      const bookingDetails = {
        room,
        userid: JSON.parse(localStorage.getItem('currentUser'))._id,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
      };
  
      try {
        setLoading(true)
        const result = await axios.post('bookings/bookroom', bookingDetails);
        setLoading(false)
        Swal.fire('Congratulation' , 'Your Room Booked Successfully','Success').then((res) => {
          window.location.href = '/bookings'
        } )
      } catch (error) {
        setLoading(false)
        Swal.fire('OOps' , 'Something went Wrong',"error") 
       } 
  };

  return (
    <>
      <Navber />
      <div className="m-5">
        {loading ? (
          <Loader />
        ) : error.length > 0 ? (
          <Error msg={error} />
        ) : (
          <div className="row justify-content-center mt-5 bs " data-aos="fade-up">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <Carousel prevLabel="" nextLabel="">
                {room?.imageurls?.map((url, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <img
                        className="d-block w-100 bigimg"
                        src={url}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>
                    Name :{' '}
                    {JSON.parse(localStorage.getItem('currentUser')).name}
                  </p>
                  <p>From Date : {params.fromdate}</p>
                  <p>To Date : {params.todate}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total Days : {totaldays}</p>
                  <p>Rent per day : {room.rentperday} $</p>
                  <p>Total Amount : {totalamount} $</p>
                </b>
              </div>

              <div style={{ float: 'right' }}>
                
                <StripeCheckout 
                amount={totalamount * 100}
                currency="USD"
                token={onToken}
                stripeKey="pk_test_51KYU3PC86U4zuuJvYOtRZyl28ZymuUW6Gvs1qbEnAN5OPyZ9ftktF2EIuK4fZAZ4QtEgCsul6D82BcqJxPXnCST500AnRy1ABF"
              >
              <button className="btn btn-primary" >
                  Pay Now
                </button>
                </StripeCheckout>
              </div>

              
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Booking;
