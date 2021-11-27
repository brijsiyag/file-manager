import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { useAppDispatch } from 'renderer/app/hooks';
import { changePath } from '../../features/main/fileManagerSlice';
import UpdateIcon from '@mui/icons-material/Update';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import AppsIcon from '@mui/icons-material/Apps';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
const os = window.require('os');
const styles = {
  FavItem: {
    marginTop: '9px',
    fontSize: '15px',
    color: '#FFFFFF',
    cursor: 'default',
    display: 'flex',
    alignItems: 'center',
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
            <Grid sx={styles.FavItem}>
              <UpdateIcon
                style={{ marginRight: '7px' }}
                fontSize="small"
                color="primary"
              />
              Recents
            </Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Desktop`));
            }}
          >
            <Grid sx={styles.FavItem}>
              <DesktopMacIcon
                style={{ marginRight: '7px' }}
                fontSize="small"
                color="primary"
              />
              Desktop
            </Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/Applications`));
            }}
          >
            <Grid sx={styles.FavItem}>
              <AppsIcon
                style={{ marginRight: '7px' }}
                fontSize="small"
                color="primary"
              />
              Applications
            </Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Documents`));
            }}
          >
            <Grid sx={styles.FavItem}>
              <DocumentScannerIcon
                style={{ marginRight: '7px' }}
                fontSize="small"
                color="primary"
              />
              Documents
            </Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Movies`));
            }}
          >
            <Grid sx={styles.FavItem}>
              <LiveTvIcon
                style={{ marginRight: '7px' }}
                fontSize="small"
                color="primary"
              />
              Movies
            </Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Music`));
            }}
          >
            <Grid sx={styles.FavItem}>
              <LibraryMusicIcon
                style={{ marginRight: '7px' }}
                fontSize="small"
                color="primary"
              />
              Music
            </Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Downloads`));
            }}
          >
            <Grid sx={styles.FavItem}>
              <DownloadForOfflineIcon
                style={{ marginRight: '7px' }}
                fontSize="small"
                color="primary"
              />
              Downloads
            </Grid>
          </div>
          <div
            onClick={() => {
              dispatch(changePath(`/users/${username}/Pictures`));
            }}
          >
            <Grid sx={styles.FavItem}>
              <InsertPhotoIcon
                style={{ marginRight: '7px' }}
                fontSize="small"
                color="primary"
              />
              Pictures
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Favourites;
