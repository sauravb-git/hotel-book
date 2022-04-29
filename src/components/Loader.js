import React, { useState } from 'react';
import {ClipLoader} from 'react-spinners';

const override = `
display: block;
margin: 0 auto;
border-color: black;
`;

const Loader = () => {
  let [loading, setLoading] = useState(true); 
  return (
    <div>
      <div className="sweet-loading mt-5"> 
        <ClipLoader   loading={loading} css={override} size={150} />
      </div>
    </div>
  );
};

export default Loader;
