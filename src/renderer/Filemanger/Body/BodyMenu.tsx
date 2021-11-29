import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import Body from './Body';
import InfoModal from './InfoModal';
import {
  bodyForceRerenderer,
  select,
  pasted,
  setInfoPath,
} from '../../features/main/fileManagerSlice';
import { RootState } from 'renderer/app/store';
import './BodyMenu.css';
const fs = window.require('fs');
const path = window.require('path');

function BodyMenu() {
  const { currPath, cutCopy } = useAppSelector(
    (state: RootState) => state.fileManager
  );
  const dispatch = useAppDispatch();
  const getInfoClickHandler = () => {
    dispatch(setInfoPath(currPath));
  };
  const newFolderClickHandler = () => {
    let folderCount = 0;
    while (
      fs.existsSync(
        `${currPath}/new folder${folderCount !== 0 ? ` ${folderCount}` : ''}`
      )
    ) {
      folderCount += 1;
    }
    fs.mkdirSync(
      `${currPath}/new folder${folderCount !== 0 ? ` ${folderCount}` : ''}`,
      { recursive: true }
    );
    dispatch(bodyForceRerenderer());
    dispatch(
      select(
        `${currPath}/new folder${folderCount !== 0 ? ` ${folderCount}` : ''}`
      )
    );
  };
  const pasteClickHandler = () => {
    console.log('Here');
    cutCopy.arr.forEach((element) => {
      console.log(element);
      console.log(`${currPath}/${path.basename(element)}`);
      try {
        fs.copyFileSync(
          element,
          `${currPath}/${path.basename(element)}`,
          fs.constants.COPYFILE_EXCL
        );
      } catch (err) {
        console.log(err);
      }
    });
    // dispatch(pasted());
    dispatch(bodyForceRerenderer());
  };
  return (
    <div>
      <ContextMenuTrigger id="main-body">
        <Body />
      </ContextMenuTrigger>
      <ContextMenu className="dir-menu-container" id="main-body">
        <MenuItem className="dir-menu-item" onClick={newFolderClickHandler}>
          New Folder
        </MenuItem>
        <MenuItem className="dir-menu-item" onClick={getInfoClickHandler}>
          Get Info
        </MenuItem>
        <hr style={{ borderColor: 'gray' }} />
        {cutCopy.arr.length > 0 && (
          <MenuItem className="dir-menu-item" onClick={pasteClickHandler}>
            Paste
          </MenuItem>
        )}
      </ContextMenu>
      <InfoModal />
    </div>
  );
}
export default BodyMenu;
