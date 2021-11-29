import React, { useEffect, useState } from 'react';
import { RootState } from 'renderer/app/store';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import { hideMenu } from 'react-contextmenu/modules/actions';
import FileIcons from './FileIcon';
import {
  changePath,
  select,
  deSelect,
} from '../../features/main/fileManagerSlice';
import './FileDisplay.css';
const fs = window.require('fs');
const { shell } = window.require('electron');
const path = window.require('path');
interface Props {
  filePath: string;
  stats: { any };
}
const FileDisplay = ({ filePath, stats }: Props) => {
  console.log('FileDisplay.tsx');
  const BaseName = path.basename(filePath);
  const [aboutFile, setAboutFile] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useAppDispatch();
  const { selected, view } = useAppSelector(
    (state: RootState) => state.fileManager
  );
  useEffect(() => {
    if (stats.isFile()) {
      if (stats.size >= 1024 * 1024 * 1024) {
        setAboutFile(
          parseFloat(stats.size / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
        );
      } else if (stats.size >= 1024 * 1024) {
        setAboutFile(parseFloat(stats.size / (1024 * 1024)).toFixed(2) + ' MB');
      } else if (stats.size > 1024) {
        setAboutFile(parseFloat(stats.size / 1024).toFixed(2) + ' KB');
      } else {
        setAboutFile(parseFloat(stats.size).toFixed(2) + ' B');
      }
    } else {
      fs.readdir(filePath, (err: string, dirStats: any[]) => {
        if (err) {
          console.log(err);
          setAboutFile(err.code);
        } else {
          setAboutFile(dirStats.length + ' items');
        }
      });
    }
  }, [filePath]);
  useEffect(() => {
    setIsSelected(selected.includes(filePath));
  }, [selected, filePath]);
  // const renameHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (!isSelected && e.target.getAttribute('contentEditable') === null) {
  //     e.target.setAttribute('contentEditable', true);
  //   }
  // };
  const FileDoubleClickHandler = () => {
    if (stats.isDirectory()) {
      dispatch(changePath(filePath));
    } else {
      shell.openPath(filePath);
    }
  };
  const FileClickHandler = () => {
    isSelected ? dispatch(deSelect(filePath)) : dispatch(select(filePath));
    setIsSelected(!isSelected);
    hideMenu();
  };
  return (
    <div
      className={`folder-display ${isSelected && 'file-selected-grid'}`}
      onDoubleClick={FileDoubleClickHandler}
      style={{
        flexDirection: view === 'grid' ? 'column' : 'row',
        width: view === 'grid' ? '75px' : 'fit-content',
        padding: view === 'grid' ? 'auto' : '2px 10px',
      }}
      onClick={FileClickHandler}
    >
      <FileIcons
        ext={path.extname(filePath)}
        isDirectory={stats.isDirectory()}
        width={view === 'grid' ? '70px' : '15px'}
      />
      <div
        className="file-name"
        // onClick={renameHandler}
        style={{
          color: '#FFFFFF',
          fontSize: '12px',
          marginTop: '2px',
          wordWrap: 'break-word',
          width: view === 'grid' ? '100%' : '200px',
          textAlign: view === 'grid' ? 'center' : 'left',
          marginLeft: view === 'grid' ? 'auto' : '15px',
        }}
      >
        {path.basename(filePath).length > 15
          ? `${path.basename(filePath).slice(0, 10)}...${BaseName.slice(
              BaseName.length - 7,
              BaseName.length
            )}`
          : BaseName}
      </div>
      <Typography
        className="file-desc"
        color="#5CCEFF"
        variant="caption"
        width={view === 'grid' ? 'fit-content' : '100px'}
      >
        {aboutFile}
      </Typography>
    </div>
  );
};

export default FileDisplay;
