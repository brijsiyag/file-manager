import React from 'react';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Box } from '@mui/system';
import { useAppDispatch } from 'renderer/app/hooks';
import {
  select,
  bodyForceRerenderer,
} from '../../features/main/fileManagerSlice';
const fs = window.require('fs');
const NewFolder = ({ currPath }: { currPath: string }) => {
  const dispatch = useAppDispatch();
  const newFolderClickHandler = () => {
    let folderCount = 0;
    while (
      fs.existsSync(
        `${currPath}/new folder${folderCount !== 0 ? ` ${folderCount}` : ''}`
      )
    ) {
      folderCount += 1;
    }
    fs.mkdirSync(
      `${currPath}/new folder${folderCount !== 0 ? ` ${folderCount}` : ''}`,
      { recursive: true }
    );
    dispatch(bodyForceRerenderer());
  };
  return (
    <Box color="white" onClick={newFolderClickHandler}>
      <CreateNewFolderIcon className="header-btn" />
    </Box>
  );
};
export default NewFolder;
