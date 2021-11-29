import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import FileDisplay from './FileDisplay';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import {
  changePath,
  bodyForceRerenderer,
  copyCutHandler,
  select,
  setInfoPath,
} from '../../features/main/fileManagerSlice';
import { RootState } from 'renderer/app/store';
const fs = window.require('fs');
const { shell } = window.require('electron');

import './Menu.css';
function Menu({ filePath }: { filePath: string }) {
  const { selected } = useAppSelector((state: RootState) => state.fileManager);
  const dispatch = useAppDispatch();
  const stats = fs.statSync(filePath);
  const openClickHandler = () => {
    if (stats.isDirectory()) {
      dispatch(changePath(filePath));
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
    <div>
      <ContextMenuTrigger id={filePath}>
        <FileDisplay stats={stats} filePath={filePath} />
      </ContextMenuTrigger>
      <ContextMenu
        className="file-menu-container"
        id={filePath}
        onShow={() => {
          dispatch(select(filePath));
        }}
      >
        <MenuItem className="file-menu-item" onClick={openClickHandler}>
          Open
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
        {stats.isDirectory() && (
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
export default Menu;
