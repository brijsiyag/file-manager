import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'renderer/app/hooks';
import { deSelectAll } from 'renderer/features/main/fileManagerSlice';
import { RootState } from 'renderer/app/store';
import Menu from './Menu';
const walk = window.require('walkdir');
const fs = window.require('fs');
const path = window.require('path');
import './Body.css';
const Body = () => {
  console.log('Body.tsx');
  const [files, setFiles] = useState<string[]>([]);
  const { currPath, view, bodyForceRerenderer, searchText, selected } =
    useAppSelector((state: RootState) => state.fileManager);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const filesArr: string[] = [];
    if (searchText === '') {
      fs.readdir(currPath, (_err: string, gotFiles: string[]) => {
        gotFiles.forEach((file: string) => {
          if (
            path.basename(file)[0] !== '.' &&
            path.basename(file) !== '$RECYCLE.BIN'
          ) {
            filesArr.push(path.join(currPath, file));
          }
        });
        setFiles(filesArr);
      });
    } else {
      let fileCounter = 0;
      try {
        const walker = walk.sync(currPath, (file, stat) => {
          if (path.basename(file).slice(0, searchText.length) === searchText) {
            filesArr.push(file);
          }
          fileCounter++;
          if (fileCounter > 10000) {
            walker.end();
          }
        });
      } catch (err) {
        console.log(err);
      }
      setFiles(filesArr);
    }
    return () => {
      setFiles([]);
      // finder.stop();
    };
  }, [currPath, bodyForceRerenderer, searchText]);
  const bodyClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      !(
        e.target.classList.contains('file-icon') ||
        e.target.classList.contains('file-name') ||
        e.target.classList.contains('file-desc')
      ) &&
      selected.length > 0
    ) {
      dispatch(deSelectAll());
    }
  };
  return (
    <div id="body-container" onClick={bodyClickHandler}>
      <div
        className="body-files-container"
        style={{
          flexDirection: view == 'grid' ? 'row' : 'column',
          columnGap: view == 'grid' ? '25px' : '2px',
          rowGap: view == 'grid' ? '25px' : '10px',
          margin: '20px',
        }}
      >
        {files.map((element) => {
          return <Grid>{<Menu filePath={element} />}</Grid>;
        })}
      </div>
    </div>
  );
};

export default Body;
