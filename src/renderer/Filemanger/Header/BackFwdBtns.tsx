import { Grid } from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import { RootState } from 'renderer/app/store';
import {
  changePath,
  pathForwarded,
  pathBackwarded,
} from '../../features/main/fileManagerSlice';
const path = window.require('path');
const BackFwdBtns = ({
  currPath,
  historyFwd,
}: {
  currPath: string;
  historyFwd: string[];
}) => {
  console.log('BackFwdBtns.tsx');

  const dispatch = useAppDispatch();
  const backwdClickHandler = () => {
    if (path.dirname(currPath) !== '/') {
      dispatch(pathBackwarded());
      dispatch(changePath(path.dirname(currPath)));
    }
  };
  const fwdBtnClickHandler = () => {
    if (historyFwd.length > 0) {
      const fwdPath = historyFwd[historyFwd.length - 1];
      console.log(fwdPath);
      dispatch(changePath(fwdPath));
      dispatch(pathForwarded());
    }
  };
  return (
    <Grid
      width="fit-content"
      container
      className="header-back-fwd-btn-container"
    >
      <div className="header-back-btn-container" onClick={backwdClickHandler}>
        <ArrowBackIosIcon />
      </div>
      <div className="header-fwd-btn-container" onClick={fwdBtnClickHandler}>
        <ArrowForwardIosIcon />
      </div>
    </Grid>
  );
};

export default BackFwdBtns;
