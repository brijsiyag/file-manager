import React from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import BackFwdBtns from './BackFwdBtns';
import './Header.css';
const Header = () => {
  console.log('Header.tsx');

  return (
    <Box minHeight="50px">
      <BackFwdBtns />
    </Box>
  );
};

export default Header;
