import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

import { Table, Tag, Space } from 'antd';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function fatchMyData() {
    try {
      const data = await (await axios.get('bookings/getallbookings')).data;
      setBookings(data);
      setLoading(false);
    } catch (error) {
      setLoading(false); 
    }
  }

  useEffect(() => {
    fatchMyData();
  }, []);

  const columns = [
    {
      title: 'transactionid',
      dataIndex: 'transactionid',
      key: 'transactionid',
    },
    { title: 'roomid', dataIndex: 'roomid', key: 'roomid' },
    { title: 'room', dataIndex: 'room', key: 'room' },
    { title: 'fromdate', dataIndex: 'fromdate', key: 'fromdate' },
    { title: 'todate', dataIndex: 'todate', key: 'todate' },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <>
          {status === 'booked' ? (
            <Tag color="green">CONFIRMED</Tag>
          ) : (
            <Tag color="red">CANCELLED</Tag>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        {loading ? (
          <Loader></Loader>
        ) :  (
          <div className="col-md-12">
            <Table columns={columns} dataSource={bookings} />
          </div>
        )}
      </div>
    </>
  );
};

export default Bookings;
