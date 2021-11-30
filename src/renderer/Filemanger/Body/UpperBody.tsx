import React from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch } from 'renderer/app/hooks';
import {
  changePath,
  tabClose,
  newTab,
} from '../../features/main/fileManagerSlice';
import './UpperBody.css';
const path = window.require('path');
const UpperBody = ({
  tabs,
  currPath,
}: {
  tabs: string[];
  currPath: string;
}) => {
  const dispatch = useAppDispatch();
  const tabClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
    tabPath: string
  ) => {
    if (
      ((e.target as Element).classList.contains('tab') ||
        (e.target as Element).classList.contains('tab-heading')) &&
      !document.getElementById(id)?.classList.contains('tab-selected')
    ) {
      document.querySelector('.tab-selected')?.classList.remove('tab-selected');
      document.getElementById(id)?.classList.add('tab-selected');
      dispatch(changePath(tabPath));
    }
  };
  const addTabClickHandler = () => {
    dispatch(newTab('/users'));
  };
  const tabCloseHandler = (tabPath: string) => {
    dispatch(tabClose(tabPath));
  };
  return (
    <Box>
      <Grid className="tabs-container">
        {tabs.map((element, index) => {
          return (
            <Box
              className={`tab ${element === currPath && 'tab-selected'}`}
              id={`tab-${index}`}
              onClick={(e) => {
                tabClickHandler(e, `tab-${index}`, element);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  tabCloseHandler(element);
                }}
                className="tab-close-btn"
              >
                X
              </button>
              <div className="tab-heading">{path.basename(element)}</div>
            </Box>
          );
        })}
        <Box className="tab add-tab" onClick={addTabClickHandler}>
          +
        </Box>
      </Grid>
    </Box>
  );
};

export default UpperBody;
