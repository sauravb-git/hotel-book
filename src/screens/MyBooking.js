import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader'; 
import Error from './../components/Error';
import Swal from "sweetalert2";
import { Tag } from "antd";

const MyBooking = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
   
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookings,setBookings] = useState([])
   


  async function fatchdata() {
    setError("");
    setLoading(true);
    try {
      const data = (
        await axios.post("bookings/getuserbookingbyuserid", {
          userid: user._id,
        })
      ).data;
      setBookings(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    fatchdata();
  }, []);

   

  async function cancelBooking(bookingid,roomid){
    try{
       setLoading(true) 
       const result = await axios.post('bookings/cancelbooking', {bookingid,roomid}).data
       setLoading(false)
       Swal.fire(
        "Congratulations",
        "Your Room Cancelled Successfully",
        "success"
      ).then((result) => {
        fatchdata();
      });
    }catch(error){ 
        console.log(error);
        Swal.fire("Opps", "Error:" + error, "error"); 
        
    }
    setLoading(false)
  }

  return (
    <>
    {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
      <div className="row">
        <div className="col-xs-12  ">
        {  bookings.length === 0 ? (<h4  >You have not booked</h4>) : bookings &&
              bookings.map((booking) => {
                return (
                  <div className="bs profile__data">
                    <h1>{booking.room}</h1>
                    <p>
                      <b>BookingId:</b> {booking._id}
                    </p>
                    <p>
                      <b>CheckIn:</b> {booking.fromdate}
                    </p>
                    <p>
                      <b>CheckOut:</b> {booking.todate}
                    </p>
                    <p>
                      <b>Amount:</b> {booking.totalamount}$
                    </p>
                    <p>
                    <b>Status:</b>{" "}
                      {booking.status === "booked" ? (
                        <Tag color="green">CONFIRMED</Tag>
                      ) : (
                        <Tag color="red">CANCELLED</Tag>
                      )}
                    </p>
                    {booking.status === "booked" && (
                      <div className='mt-3'  style={{textAlign:'left'}}>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            cancelBooking(booking._id, booking.roomid);
                          }}
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}  
        </div>
      </div>)}
    </>
  );
};

export default MyBooking;
