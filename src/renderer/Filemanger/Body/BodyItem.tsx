import React, { useEffect, useState } from 'react';
import { RootState } from 'renderer/app/store';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import { hideMenu } from 'react-contextmenu/modules/actions';
import './BodyItem.css';
import {
  changePath,
  select,
  deSelect,
  deSelectAll,
  bodyForceRerenderer,
} from '../../features/main/fileManagerSlice';
import FileIcons from './FileIcon';
import Draggable from 'react-draggable';
const fs = window.require('fs');
const { shell } = window.require('electron');
const path = window.require('path');
interface Props {
  filePath: string;
  stats: { any };
}
const BodyItem = ({ filePath, stats }: Props) => {
  // console.log('FileDisplay.tsx');
  const BaseName = path.basename(filePath);
  const [aboutFile, setAboutFile] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [fileName, setFileName] = useState('');
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
    const tempFileName =
      path.basename(filePath).length > 15 && !isSelected
        ? `${path.basename(filePath).slice(0, 7)}...${BaseName.slice(
            BaseName.length - 5,
            BaseName.length
          )}`
        : BaseName;
    setFileName(tempFileName);
    return () => {
      setIsSelected(false);
    };
  }, [isSelected, filePath]);
  useEffect(() => {
    setIsSelected(selected.includes(filePath));
  }, [selected, filePath]);
  const FileDoubleClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!(e.target as Element).classList.contains('file-name')) {
      if (stats.isDirectory()) {
        dispatch(changePath(filePath));
      } else {
        shell.openPath(filePath);
      }
    }
  };
  const FileClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.metaKey) {
      isSelected ? dispatch(deSelect(filePath)) : dispatch(select(filePath));
      setIsSelected(!isSelected);
    } else if (
      isSelected &&
      (e.target as Element).classList.contains('file-name')
    ) {
      (e.target as Element).setAttribute('contentEditable', 'true');
      (e.target as Element).focus();
      const handleClickEvent = (e1: MouseEvent) => {
        if (!(e1.target as Element).classList.contains('file-name')) {
          fs.rename(
            filePath,
            `${path.dirname(filePath)}/${(e.target as Element).innerHTML}`,
            (err: string) => {
              if (err) {
                console.log(err);
              } else {
                (e.target as Element).setAttribute('contentEditable', 'false');
                // remove click eventListener otherwise it will rerender page everytime after file name changed
                dispatch(bodyForceRerenderer());
              }
              document.removeEventListener('click', handleClickEvent, true);
            }
          );
        }
      };
      document.addEventListener('click', handleClickEvent, true);
    } else {
      dispatch(deSelectAll());
      isSelected ? dispatch(deSelect(filePath)) : dispatch(select(filePath));
      setIsSelected(!isSelected);
    }
    hideMenu();
  };
  return (
    <Draggable
      disabled={view !== 'grid'}
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[1, 1]}
      scale={1}
      onStart={this.handleStart}
      onDrag={this.handleDrag}
      onStop={this.handleStop}
    >
      <div
        className="folder-display handle"
        onDoubleClick={FileDoubleClickHandler}
        style={{
          flexDirection: view === 'grid' ? 'column' : 'row',
          width: view === 'grid' ? '75px' : 'fit-content',
          padding: view === 'grid' ? 'auto' : '2px 10px',
          backgroundColor: isSelected && view === 'list' ? 'rgb(55,55,55)' : '',
          padding: '3px',
          borderRadius: '5px',
        }}
        onClick={FileClickHandler}
      >
        <div
          style={{
            borderRadius: '3px',
            backgroundColor:
              isSelected && view === 'grid' ? 'rgb(55,55,55)' : '',
            padding: '3px',
          }}
        >
          <FileIcons
            ext={path.extname(filePath)}
            filePath={filePath}
            isDirectory={stats.isDirectory()}
            width={view === 'grid' ? '70px' : '15px'}
          />
        </div>
        <div
          className="file-name"
          spellCheck="false"
          style={{
            color: '#FFFFFF',
            fontSize: '12px',
            marginTop: '2px',
            wordWrap: 'break-word',
            width: view === 'grid' ? '90%' : '200px',
            textAlign: view === 'grid' ? 'center' : 'left',
            marginLeft: view === 'grid' ? 'auto' : '15px',
            backgroundColor:
              isSelected && view === 'grid' ? 'rgb(50,89,204)' : '',
            borderRadius: '3px',
            padding: '2px',
          }}
        >
          {fileName}
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
    </Draggable>
  );
};

export default BodyItem;
