import { Box } from '@mui/system';
import React from 'react';
import UpperBody from './UpperBody';
import { useAppSelector } from 'renderer/app/hooks';
import { RootState } from 'renderer/app/store';

const UpperBodyContainer = (props: Props) => {
  const { tabs, currPath } = useAppSelector(
    (state: RootState) => state.fileManager
  );
  return (
    <Box>
      {tabs.length > 1 && <UpperBody tabs={tabs} currPath={currPath} />}
    </Box>
  );
};

export default UpperBodyContainer;
