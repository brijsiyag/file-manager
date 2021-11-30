import { Box } from '@mui/system';
import React from 'react';
import LowerBodyContainer from './LowerBodyContainer';
import UpperBodyContainer from './UpperBodyContainer';
const Body = () => {
  return (
    <div>
      <UpperBodyContainer />
      <LowerBodyContainer />
    </div>
  );
};

export default Body;
