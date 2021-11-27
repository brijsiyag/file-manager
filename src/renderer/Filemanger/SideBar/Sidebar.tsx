import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Favourites from './Favourites';
import Tags from './Tags';
interface Props {}

const Sidebar = (props: Props) => {
  console.log('Sidebar.tsx');

  return (
    <Box>
      <Grid>
        <Grid>
          <Favourites />
        </Grid>
        <Grid>
          <Tags />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sidebar;
