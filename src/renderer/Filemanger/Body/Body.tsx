import { Box } from '@mui/system';
import React from 'react';
import LowerBodyContainer from './FilesFolders/BodyContainer';
import UpperBodyContainer from './Tabs/TabsContainer';
const Body = () => {
  return (
    <div style={{ width: '100%' }}>
      <UpperBodyContainer />
      <LowerBodyContainer />
    </div>
  );
};

export default Body;
