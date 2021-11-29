import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Grid, Input, Typography } from '@mui/material';
import BackFwdBtns from './BackFwdBtns';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import { RootState } from 'renderer/app/store';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import {
  changeView,
  serachTexhChange,
} from 'renderer/features/main/fileManagerSlice';
import NewFolder from './NewFolder';
import DeleteFileFolder from './DeleteFileFolder';
const path = window.require('path');
import './Header.css';
const Header = () => {
  console.log('Header.tsx');
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
  return (
    <Box minHeight="50px" display="flex" alignItems="center">
      <Grid display="flex" alignItems="center">
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
      <Grid
        display="flex"
        marginLeft="80px"
        width="100px"
        justifyContent="space-around"
      >
        <Grid>
          <NewFolder currPath={currPath} />
        </Grid>
        <Grid>
          <DeleteFileFolder />
        </Grid>
      </Grid>
      <Grid color="white" marginLeft="auto" marginRight="20px">
        <input
          style={{ width: '200px' }}
          placeholder="Search"
          value={searchText}
          onChange={serachHandler}
        ></input>
      </Grid>
    </Box>
  );
};

export default Header;
