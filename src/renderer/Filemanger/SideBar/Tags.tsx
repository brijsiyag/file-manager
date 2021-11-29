import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
const styles = {
  tagItem: {
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
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#C0C0C0',
  },
  colorCircle: {
    fontSize: '12px',
    marginRight: '6px',
  },
};

const Tags = () => {
  console.log('Tags.tsx');

  return (
    <Box>
      <Grid sx={styles.containerGrid}>
        <Grid>
          <Typography sx={styles.heading} variant="subtitle1">
            Tags
          </Typography>
        </Grid>
        <Grid
          sx={{
            marginTop: '10px',
            marginLeft: '15px',
          }}
        >
          <Grid sx={styles.tagItem} alignItems="center">
            <CircleIcon sx={styles.colorCircle} style={{ color: 'black' }} />
            Black
          </Grid>
          <Grid sx={styles.tagItem}>
            <CircleIcon sx={styles.colorCircle} style={{ color: 'red' }} />
            Red
          </Grid>
          <Grid sx={styles.tagItem}>
            <CircleIcon sx={styles.colorCircle} style={{ color: 'orange' }} />
            Orange
          </Grid>
          <Grid sx={styles.tagItem}>
            <CircleIcon sx={styles.colorCircle} style={{ color: 'yellow' }} />
            Yellow
          </Grid>
          <Grid sx={styles.tagItem}>
            <CircleIcon sx={styles.colorCircle} style={{ color: 'green' }} />
            Green
          </Grid>
          <Grid sx={styles.tagItem}>
            <CircleIcon sx={styles.colorCircle} style={{ color: 'blue' }} />
            Blue
          </Grid>
          <Grid sx={styles.tagItem}>
            <CircleIcon sx={styles.colorCircle} style={{ color: 'purple' }} />
            Purple
          </Grid>
          <Grid sx={styles.tagItem}>
            <CircleIcon sx={styles.colorCircle} style={{ color: 'gray' }} />
            All Tags...
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tags;
