import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { hideMenu } from 'react-contextmenu';
import { useAppSelector, useAppDispatch } from 'renderer/app/hooks';
import { deSelectAll } from 'renderer/features/main/fileManagerSlice';
import { RootState } from 'renderer/app/store';
import SelectoComponent from './SelectoComponent';
import Menu from './BodyItem/BodyItemContainer';
const walk = window.require('walkdir');
const fs = window.require('fs');
const path = window.require('path');
import './Body.css';

const Body = () => {
  // console.log('Body.tsx');
  const [files, setFiles] = useState<string[]>([]);
  const { currPath, view, bodyForceRerenderer, searchText, selected } =
    useAppSelector((state: RootState) => state.fileManager);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const filesArr: string[] = [];
    // No search Text..
    if (searchText === '') {
      fs.readdir(currPath, (_err: string, gotFiles: string[]) => {
        gotFiles?.forEach((file: string) => {
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
      //Searching For files
      let fileCounter = 0;
      try {
        const walker = walk.sync(currPath, (file: string, stat: any) => {
          if (
            path.basename(file).slice(0, searchText.length).toLowerCase() ===
            searchText.toLowerCase()
          ) {
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
    };
  }, [currPath, bodyForceRerenderer, searchText]);
  const bodyClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    //add below lines if don't want to trigger rerender on context menu click
    //e.target.classList.contains('react-contextmenu-item') ||
    //e.target.classList.contains('react-context-menu');
    if (
      !(
        (e.target as Element).classList.contains('file-icon') ||
        (e.target as Element).classList.contains('file-name') ||
        (e.target as Element).classList.contains('file-desc')
      ) &&
      selected.length > 0
    ) {
      dispatch(deSelectAll());
    }
    hideMenu();
  };
  return (
    <div
      id="body-container"
      style={{ minHeight: '90vh' }}
      // onMouseDown={(e) => bodyClickHandler(e)}
    >
      <SelectoComponent />
      <div
        className="body-files-container"
        style={{
          flexDirection: view == 'grid' ? 'row' : 'column',
          columnGap: view == 'grid' ? '25px' : '2px',
          rowGap: view == 'grid' ? '25px' : '7px',
          margin: '20px',
          height: 'fit-content',
        }}
      >
        {files.map((element) => {
          return (
            <Grid height="fit-content">{<Menu filePath={element} />}</Grid>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
