import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

import { Table, Tag, Space } from 'antd';

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const columns = [ 
    {
      title: 'roomid',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    { title: 'maxcount', dataIndex: 'maxcount', key: 'maxcount' },
    { title: 'phonenumber', dataIndex: 'phonenumber', key: 'phonenumber' },
    { title: 'rentperday', dataIndex: 'rentperday', key: 'rentperday' },
    { title: 'type', dataIndex: 'type', key: 'type' },
  ];

  async function fetchMyData() {
    setError('');
    setLoading(true);
    try {
      const data = (await axios.get('rooms/getallrooms')).data;
      setRooms(data); 
    } catch (error) {
      console.log(error); 
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div>
      <div className="row">
        {loading ? (
          <Loader></Loader>
        ) :   (
          <>
            <div className="col-md-1">
              <button className="btn btn-success" onClick={fetchMyData}  >
                Refresh
              </button>
            </div>
            <div className="col-md-12">
              <Table columns={columns} key={columns.i} dataSource={rooms} style={{display:'block'}} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Room;
