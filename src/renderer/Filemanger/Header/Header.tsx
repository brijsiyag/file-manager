import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Grid, Input, Typography } from '@mui/material';
import BackFwdBtns from './BackFwdBtns';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import { RootState } from 'renderer/app/store';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  changeView,
  serachTexhChange,
  bodyForceRerenderer,
} from 'renderer/features/main/fileManagerSlice';
const path = window.require('path');
import './Header.css';
const Header = () => {
  // console.log('Header.tsx');
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const { currPath, historyFwd } = useAppSelector((state: RootState) => {
    return state.fileManager;
  });
  useEffect(() => {
    setSearchText('');
  }, [currPath]);
  const serachHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(serachTexhChange(e.target.value));
    setSearchText(e.target.value);
  };
  const RefreshClickHandler = () => {
    dispatch(bodyForceRerenderer());
  };
  return (
    <Box minHeight="50px" display="flex" alignItems="center">
      <Grid display="flex" alignItems="center" width="300px">
        <BackFwdBtns currPath={currPath} historyFwd={historyFwd} />
        <Typography
          marginLeft="10px"
          color="whitesmoke"
          fontSize="20px"
          width="300px"
        >
          {path.basename(currPath)}
        </Typography>
      </Grid>
      <Grid display="flex">
        <Box
          onClick={() => {
            dispatch(changeView('list'));
          }}
          marginRight="10px"
          padding="3px"
          color="white"
          className="header-btn"
        >
          <FormatListBulletedIcon color="inherit" />
        </Box>
        <Box
          onClick={() => {
            dispatch(changeView('grid'));
          }}
          marginLeft="10px"
          padding="3px"
          color="white"
          className="header-btn"
        >
          <GridViewIcon color="inherit" />
        </Box>
      </Grid>
      <Grid>
        <Box
          marginLeft="30px"
          padding="3px"
          color="white"
          className="header-btn"
          onClick={RefreshClickHandler}
        >
          <RefreshIcon />
        </Box>
      </Grid>
      <Grid color="white" marginLeft="auto" marginRight="20px">
        <input
          className="header-search-bar"
          placeholder="Search"
          value={searchText}
          onChange={serachHandler}
        ></input>
      </Grid>
    </Box>
  );
};

export default Header;
