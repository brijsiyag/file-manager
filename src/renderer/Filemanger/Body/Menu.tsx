import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import FileDisplay from './FileDisplay';
import './Menu.css';
function Menu({ filePath }: { filePath: string }) {
  return (
    <div>
      <ContextMenuTrigger id="file-menu-container">
        <FileDisplay filePath={filePath} />
      </ContextMenuTrigger>
      <ContextMenu className="file-menu-container" id="file-menu-container">
        <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
          Open
        </MenuItem>
        <hr style={{ borderColor: 'gray' }} />
        <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
          Delete
        </MenuItem>
        <hr style={{ borderColor: 'gray' }} />
        <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
          Get Info
        </MenuItem>
        <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
          Rename
        </MenuItem>
        <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
          Paste
        </MenuItem>
        <hr style={{ borderColor: 'gray' }} />
        <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
          Cut
        </MenuItem>
        <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
          Copy
        </MenuItem>
        <hr style={{ borderColor: 'gray' }} />
        <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
          New Terminal At Folder
        </MenuItem>
        <MenuItem className="file-menu-item" data={{ foo: 'bar' }}>
          New Terminal Tab At Folder
        </MenuItem>
      </ContextMenu>
    </div>
  );
}
export default Menu;
