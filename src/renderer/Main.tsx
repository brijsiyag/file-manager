import React, { ReactElement, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Sidebar from './Filemanger/SideBar/Sidebar';
import Header from './Filemanger/Header/Header';
import Body from './Filemanger/Body/Body';
const fs = window.require('fs');
const styles = {
  sidebar: {
    backgroundColor: 'rgb(59,59,59)',
    height: '100vh',
    minWidth: '300px',
    overflow: 'auto',
  },
  header: {
    backgroundColor: 'rgb(42,42,42)',
    minHeight: '50px',
  },
  body: {
    backgroundColor: 'rgb(36,35,35)',
    height: '100vh',
    overflow: 'auto',
  },
};
export default function Main(): ReactElement {
  console.log('Main.tsx');
  useEffect(() => {
    console.log('IN Data File Creater....');
    fs.exists('fileManagerLocalData.js', function (exists: boolean) {
      if (!exists) {
        fs.writeFile(
          'fileManagerLocalData.js',
          'export default {};',
          { flag: 'wx' },
          function (err: string) {
            if (err) {
              console.log(err);
            } else {
              console.log('fileManagerLocalData.js Successfuly Created....');
            }
          }
        );
      }
    });
  });
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
