import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import LowerBody from './Body';
import InfoModal from './ItemInfo/InfoModal';
import {
  bodyForceRerenderer,
  select,
  setInfoPath,
} from '../../../features/main/fileManagerSlice';
import { RootState } from 'renderer/app/store';
import './BodyContainer.css';
const fs = window.require('fs');
const path = window.require('path');

function LowerBodyContainer() {
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
    cutCopy.arr.forEach((element) => {
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
    dispatch(bodyForceRerenderer());
  };
  return (
    <div>
      <ContextMenuTrigger holdToDisplay="false" id="main-body-container">
        <LowerBody />
      </ContextMenuTrigger>
      <ContextMenu className="dir-menu-container" id="main-body-container">
        <MenuItem className="dir-menu-item" onClick={newFolderClickHandler}>
          New Folder
        </MenuItem>
        <MenuItem className="dir-menu-item" onClick={getInfoClickHandler}>
          Get Info
        </MenuItem>
        {cutCopy.arr.length > 0 && (
          <div>
            <hr style={{ borderColor: 'gray' }} />
            <MenuItem className="dir-menu-item" onClick={pasteClickHandler}>
              Paste
            </MenuItem>
          </div>
        )}
      </ContextMenu>
      <InfoModal />
    </div>
  );
}
export default LowerBodyContainer;
