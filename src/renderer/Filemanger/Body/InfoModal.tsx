import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppSelector, useAppDispatch } from 'renderer/app/hooks';
import { RootState } from 'renderer/app/store';
import { setInfoPath } from 'renderer/features/main/fileManagerSlice';
import { useState } from 'react';
import FileIcons from './FileIcon';
const fs = window.require('fs');
const path = window.require('path');
const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'rgb(58,58,58)',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const { infoPath } = useAppSelector((state: RootState) => state.fileManager);
  const [items, setItems] = useState('');
  const [info, setInfo] = useState({});
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (infoPath !== '') {
      const stats = fs.statSync(infoPath);
      if (stats.size >= 1024 * 1024 * 1024) {
        stats.size = `${parseFloat(stats.size / (1024 * 1024 * 1024)).toFixed(
          2
        )} GB`;
      } else if (stats.size >= 1024 * 1024) {
        stats.size = `${parseFloat(stats.size / (1024 * 1024)).toFixed(2)} MB`;
      } else if (stats.size > 1024) {
        stats.size = `${parseFloat(stats.size / 1024).toFixed(2)} KB`;
      } else {
        stats.size = `${parseFloat(stats.size).toFixed(2)} B`;
      }
      if (stats.isDirectory()) {
        fs.readdir(infoPath, (err: { code: string }, dirStats: any[]) => {
          if (err) {
            console.log(err);
            setItems(err.code);
          } else {
            setItems(`${dirStats.length} items`);
          }
        });
      }
      stats.isDir = stats.isDirectory();
      setInfo(stats);
      setOpen(true);
      console.log(info);
    }
    return () => {
      setOpen(false);
    };
  }, [infoPath]);
  const handleClose = () => {
    setOpen(false);
    dispatch(setInfoPath(''));
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <div style={{ width: '200px' }}>
            <FileIcons
              ext={path.extname(infoPath)}
              isDirectory={info.isDir}
              width="200px"
            />
          </div>
          <Box
            color="white"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: '20px',
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {path.basename(infoPath)}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {info.size}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {info.isDir && items}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
