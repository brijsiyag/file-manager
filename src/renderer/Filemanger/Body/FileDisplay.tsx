import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import FolderIcon from './Icons/folderIcon.png';
import FileIcon from './Icons/fileIcon.png';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
const fs = window.require('fs');
import { RootState } from 'renderer/app/store';
import {
  changePath,
  select,
  deSelect,
} from '../../features/main/fileManagerSlice';
const path = window.require('path');
import './FileDisplay.css';
interface Props {
  filePath: string;
}
const FileDisplay = ({ filePath }: Props) => {
  console.log('FileDisplay.tsx');
  const stats = fs.statSync(filePath);
  const [aboutFile, setAboutFile] = useState('');
  useEffect(() => {
    if (stats.isFile()) {
      setAboutFile(parseFloat(stats.size / (1024 * 1024)).toFixed(2) + ' MB');
    } else {
      fs.readdir(filePath, (err, dirData) => {
        if (err) {
          console.log(err);
          setAboutFile(err.code);
        } else {
          setAboutFile(dirData.length + ' items');
        }
      });
    }
  }, []);

  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((state: RootState) => state.fileManager);
  useEffect(() => {
    let flag = false;
    selected.forEach((element) => {
      if (element === filePath) {
        flag = true;
        return;
      }
    });
    setIsSelected(flag);
  }, [selected]);
  const FileDoubleClickHandler = () => {
    if (stats.isDirectory()) {
      dispatch(changePath(filePath));
    }
  };
  const FileClickHandler = () => {
    isSelected ? dispatch(deSelect(filePath)) : dispatch(select(filePath));
    setIsSelected(!isSelected);
  };
  return (
    <div
      className={`folder-display ${isSelected && 'file-selected'}`}
      onDoubleClick={FileDoubleClickHandler}
      onClick={FileClickHandler}
    >
      <img
        width="70px"
        src={stats.isDirectory() ? FolderIcon : FileIcon}
        alt="Icons"
      />
      <Typography
        color="#FFFFFF"
        textAlign="center"
        variant="subtitle2"
        style={{ wordWrap: 'break-word', width: '100%' }}
      >
        {path.basename(filePath).length > 15
          ? path.basename(filePath).slice(0, 15) + '...'
          : path.basename(filePath)}
      </Typography>
      <Typography color="#5CCEFF" variant="caption">
        {aboutFile}
      </Typography>
    </div>
  );
};

export default FileDisplay;
