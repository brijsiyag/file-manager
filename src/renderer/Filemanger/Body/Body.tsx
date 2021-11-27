import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'renderer/app/hooks';
import { deSelectAll } from 'renderer/features/main/fileManagerSlice';
import { RootState } from 'renderer/app/store';
import FileDisplay from './FileDisplay';
const fs = window.require('fs');
const path = window.require('path');
import './Body.css';
const Body = () => {
  console.log('Body.tsx');
  const [files, setFiles] = useState<string[]>([]);
  const { currPath } = useAppSelector((state: RootState) => state.fileManager);
  const dispatch = useAppDispatch();
  useEffect(() => {
    fs.readdir(currPath, (_err: string, gotFiles: string[]) => {
      const filesArr: string[] = [];
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
  }, [currPath]);
  const bodyClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      !(
        e.target.firstChild === null ||
        e.target.firstChild.className === 'folder-display'
      )
    ) {
      dispatch(deSelectAll());
    }
  };
  return (
    <div id="body-container" onClick={bodyClickHandler}>
      <div className="body-files-container">
        {files.map((element) => {
          return <Grid>{<FileDisplay filePath={element} />}</Grid>;
        })}
      </div>
    </div>
  );
};

export default Body;
