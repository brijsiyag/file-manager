import React, { useEffect, useState } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import FileDisplay from './BodyItem';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import {
  bodyForceRerenderer,
  copyCutHandler,
  select,
  setInfoPath,
  newTab,
} from '../../../../features/main/fileManagerSlice';
import { RootState } from 'renderer/app/store';
const fs = window.require('fs');
const { shell } = window.require('electron');

import './BodyItemContainer.css';
function BodyItemContainer({ filePath }: { filePath: string }) {
  const { selected } = useAppSelector((state: RootState) => state.fileManager);
  const dispatch = useAppDispatch();
  const [stats, setStats] = useState(undefined);
  useEffect(() => {
    const stats = fs.statSync(filePath);
    setStats(stats);
    return () => {
      setStats({});
    };
  }, []);
  const openClickHandler = () => {
    if (stats.isDirectory()) {
      dispatch(newTab(filePath));
    } else {
      shell.openPath(filePath);
    }
  };
  const cutCopyClickHandler = (type: string) => {
    dispatch(copyCutHandler(type));
  };
  const getInfoClickHandler = () => {
    dispatch(setInfoPath(filePath));
  };
  const deleteFileClickHandler = async () => {
    selected.forEach((element: string) => {
      shell.trashItem(element);
      //use below functionality for permanent delete

      // fs.stat(element, (err: string, stats) => {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   }
      //   try {
      //     if (stats.isDirectory()) {
      //       fs.rmdirSync(element, { recursion: true });
      //       console.log(`${element} Deleted Successfuly...`);
      //     } else {
      //       fs.unlinkSync(element);
      //       console.log(`${element} Deleted Successfuly...`);
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // });
    });
    dispatch(bodyForceRerenderer());
  };
  return (
    <div>
      <ContextMenuTrigger holdToDisplay="false" id={filePath}>
        {stats !== undefined && (
          <FileDisplay stats={stats} filePath={filePath} />
        )}
      </ContextMenuTrigger>
      <ContextMenu
        className="file-menu-container"
        id={filePath}
        onShow={() => {
          dispatch(select(filePath));
        }}
      >
        <MenuItem className="file-menu-item" onClick={openClickHandler}>
          {stats !== undefined && stats.isDirectory()
            ? 'Open In New Tab'
            : 'Open'}
        </MenuItem>
        <hr style={{ borderColor: 'gray' }} />
        <MenuItem className="file-menu-item" onClick={deleteFileClickHandler}>
          Delete
        </MenuItem>
        <hr style={{ borderColor: 'gray' }} />
        <MenuItem className="file-menu-item" onClick={getInfoClickHandler}>
          Get Info
        </MenuItem>
        <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
          Rename
        </MenuItem>
        <hr style={{ borderColor: 'gray' }} />
        <MenuItem
          className="file-menu-item"
          onClick={() => {
            cutCopyClickHandler('cut');
          }}
        >
          Cut
        </MenuItem>
        <MenuItem
          className="file-menu-item"
          onClick={() => {
            cutCopyClickHandler('copy');
          }}
        >
          Copy
        </MenuItem>
        {stats !== undefined && stats.isDirectory() && (
          <div>
            <hr style={{ borderColor: 'gray' }} />
            <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
              New Terminal At Folder
            </MenuItem>
            <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
              New Terminal Tab At Folder
            </MenuItem>
          </div>
        )}
      </ContextMenu>
    </div>
  );
}
export default BodyItemContainer;
