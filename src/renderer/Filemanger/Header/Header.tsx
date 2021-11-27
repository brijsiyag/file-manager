import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import BackFwdBtns from './BackFwdBtns';
import { useAppSelector } from 'renderer/app/hooks';
import { RootState } from 'renderer/app/store';
const path = window.require('path');
import './Header.css';
const Header = () => {
  console.log('Header.tsx');
  const { currPath, historyFwd } = useAppSelector((state: RootState) => {
    return state.fileManager;
  });
  return (
    <Box minHeight="50px" display="flex" alignItems="center">
      <BackFwdBtns currPath={currPath} historyFwd={historyFwd} />
      <Typography marginLeft="10px" color="whitesmoke" fontSize="20px">
        {path.basename(currPath)}
      </Typography>
    </Box>
  );
};

export default Header;
