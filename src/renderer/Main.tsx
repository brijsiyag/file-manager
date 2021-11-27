import React, { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Sidebar from './Filemanger/SideBar/Sidebar';
import Header from './Filemanger/Header/Header';
import Body from './Filemanger/Body/Body';
const styles = {
  sidebar: {
    backgroundColor: '#606060',
    height: '100vh',
    minWidth: '300px',
  },
  header: {
    backgroundColor: '#494949',
    minHeight: '50px',
  },
  body: {
    backgroundColor: '#414141',
    height: '100vh',
    overflow: 'auto',
  },
};
export default function Main(): ReactElement {
  console.log('Main.tsx');

  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: 0,
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Grid container flexWrap="nowrap">
        <Grid item sx={styles.sidebar}>
          <Sidebar />
        </Grid>
        <Grid height="100vh" flexDirection="column" flexGrow="1">
          <Grid sx={styles.header}>
            <Header />
          </Grid>
          <Grid justifyContent="center" sx={styles.body}>
            <Body />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
