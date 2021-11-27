import { Grid } from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import { RootState } from 'renderer/app/store';
import { changePath } from '../../features/main/fileManagerSlice';
const path = window.require('path');
const BackFwdBtns = () => {
  console.log('BackFwdBtns.tsx');

  const dispatch = useAppDispatch();
  const { currPath } = useAppSelector((state: RootState) => {
    return state.fileManager;
  });
  return (
    <Grid container className="header-back-fwd-btn-container">
      <div
        className="header-back-btn-container"
        onClick={() => dispatch(changePath(path.dirname(currPath)))}
      >
        <ArrowBackIosIcon />
      </div>
      <div className="header-fwd-btn-container">
        <ArrowForwardIosIcon />
      </div>
    </Grid>
  );
};

export default BackFwdBtns;
