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
  serachTexhChange,
} from '../../features/main/fileManagerSlice';
const path = window.require('path');
const BackFwdBtns = ({
  currPath,
  historyFwd,
}: {
  currPath: string;
  historyFwd: string[];
}) => {
  // console.log('BackFwdBtns.tsx');

  const dispatch = useAppDispatch();
  const backwdClickHandler = () => {
    if (path.dirname(currPath) !== '/') {
      dispatch(pathBackwarded());
      dispatch(changePath(path.dirname(currPath)));
      dispatch(serachTexhChange(''));
    }
  };
  const fwdBtnClickHandler = () => {
    if (historyFwd.length > 0) {
      const fwdPath = historyFwd[historyFwd.length - 1];
      // console.log(fwdPath);
      dispatch(changePath(fwdPath));
      dispatch(pathForwarded());
      dispatch(serachTexhChange(''));
    }
  };
  return (
    <Grid
      width="fit-content"
      container
      minWidth="fit-content"
      className="header-back-fwd-btn-container"
    >
      <div
        className="header-back-btn-container header-btn"
        onClick={backwdClickHandler}
      >
        <ArrowBackIosIcon />
      </div>
      <div
        className="header-fwd-btn-container header-btn"
        onClick={fwdBtnClickHandler}
      >
        <ArrowForwardIosIcon />
      </div>
    </Grid>
  );
};

export default BackFwdBtns;
