import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { useAppDispatch } from 'renderer/app/hooks';
import { changePath } from '../../features/main/fileManagerSlice';
const os = window.require('os');
const styles = {
  FavItem: {
    marginTop: '9px',
    fontSize: '22px',
    color: '#FFFFFF',
    cursor: 'default',
  },
  containerGrid: {
    marginTop: '3rem',
    marginLeft: '1.5rem',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#C0C0C0',
  },
};

function Favourites(): ReactElement {
  console.log(Favourites.tsx);

  const { username } = os.userInfo();
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Grid sx={styles.containerGrid}>
        <Grid>
          <Typography sx={styles.heading} variant="subtitle1">
            Favourites
          </Typography>
        </Grid>
        <Grid
          sx={{
            marginTop: '10px',
            marginLeft: '15px',
          }}
        >
          <div>
            <Grid sx={styles.FavItem}>Recents</Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Desktop`));
            }}
          >
            <Grid sx={styles.FavItem}>Desktop</Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/Applications`));
            }}
          >
            <Grid sx={styles.FavItem}>Applications</Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Documents`));
            }}
          >
            <Grid sx={styles.FavItem}>Documents</Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Movies`));
            }}
          >
            <Grid sx={styles.FavItem}>Movies</Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Music`));
            }}
          >
            <Grid sx={styles.FavItem}>Music</Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Downloads`));
            }}
          >
            <Grid sx={styles.FavItem}>Downloads</Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Pictures`));
            }}
          >
            <Grid sx={styles.FavItem}>Pictures</Grid>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Favourites;
