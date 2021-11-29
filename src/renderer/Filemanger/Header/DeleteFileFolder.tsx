import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { useAppSelector, useAppDispatch } from 'renderer/app/hooks';
import { RootState } from 'renderer/app/store';
import { bodyForceRerenderer } from 'renderer/features/main/fileManagerSlice';
const fs = window.require('fs');
const DeleteFileFolder = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((state: RootState) => state.fileManager);
  const deleteFileClickHandler = async () => {
    // const selected = [
    //   '/Users/birju/Desktop/FileManagerTest/new folder',
    //   '/Users/birju/Desktop/FileManagerTest/new folder 1',
    //   '/Users/birju/Desktop/FileManagerTest/new folder 2',
    // ];
    selected.forEach((element) => {
      fs.stat(element, (err: string, stats) => {
        if (err) {
          console.log(err);
          return;
        }
        if (stats.isDirectory()) {
          fs.rmdirSync(element, { recursion: true });
          console.log(`${element} Deleted Successfuly...`);
        } else {
          fs.unlinkSync(element);
          console.log(`${element} Deleted Successfuly...`);
        }
      });
    });
    dispatch(bodyForceRerenderer());
  };
  return (
    <Box color="white" onClick={deleteFileClickHandler}>
      <DeleteIcon className="header-btn" />
    </Box>
  );
};

export default DeleteFileFolder;
