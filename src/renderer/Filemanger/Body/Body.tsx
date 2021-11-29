import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'renderer/app/hooks';
import { deSelectAll } from 'renderer/features/main/fileManagerSlice';
import { RootState } from 'renderer/app/store';
import FileDisplay from './FileDisplay';
const findit = window.require('findit2');
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
      const walker = walk.sync(currPath, (file, stat) => {
        if (path.basename(file).slice(0, searchText.length) === searchText) {
          filesArr.push(file);
        }
        fileCounter++;
        if (fileCounter > 1000) {
          walker.end();
        }
      });
      setFiles(filesArr);
      // const finder = findit(currPath);
      // finder.on('path', (file: string) => {
      //   fileCounter++;
      // if (path.basename(file).includes(searchText)) {
      //   filesArr.push(file);
      // }
      //   if (fileCounter > 500) {
      //     finder.stop();
      //     setFiles(filesArr);
      //   }
      // });
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
        style={{ flexDirection: view == 'grid' ? 'row' : 'column' }}
      >
        {files.map((element) => {
          return <Grid>{<FileDisplay filePath={element} />}</Grid>;
        })}
      </div>
    </div>
  );
};

export default Body;
