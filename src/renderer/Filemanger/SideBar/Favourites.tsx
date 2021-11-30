import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import UpdateIcon from '@mui/icons-material/Update';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import AppsIcon from '@mui/icons-material/Apps';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { changePath } from '../../features/main/fileManagerSlice';
import { RootState } from 'renderer/app/store';
import './Favourites.css';
const os = window.require('os');
const styles = {
  FavItem: {
    fontSize: '15px',
    padding: '5px 7px',
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
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#C0C0C0',
  },
};
function Favourites(): ReactElement {
  const { currPath } = useAppSelector((state: RootState) => state.fileManager);
  console.log('Favourites.tsx');
  const { username } = os.userInfo();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // document.querySelector('.selected-fav')?.classList.remove('selected-fav');
  }, [currPath]);
  const favClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    clickedPath: string
  ) => {
    dispatch(changePath(clickedPath));
    document.querySelector('.selected-fav')?.classList.remove('selected-fav');
    (e.target as Element).classList.add('selected-fav');
  };
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
            marginLeft: '7px',
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
            onClick={(e) => {
              favClickHandler(e, `/users/${username}/Desktop`);
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
            onClick={(e) => {
              favClickHandler(e, `/Applications`);
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
            onClick={(e) => {
              favClickHandler(e, `/users/${username}/Documents`);
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
            onClick={(e) => {
              favClickHandler(e, `/users/${username}/Movies`);
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
            onClick={(e) => {
              favClickHandler(e, `/users/${username}/Music`);
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
            onClick={(e) => {
              favClickHandler(e, `/users/${username}/Downloads`);
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
            onClick={(e) => {
              favClickHandler(e, `/users/${username}/Pictures`);
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
