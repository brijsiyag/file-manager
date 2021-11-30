import React, { useEffect, useState } from 'react';
import FileIconPath from './FileIconPath';
import Audio from './Icons/audio-file.png';
import Text from './Icons/text.png';
import DiskImage from './Icons/dvd.png';
import Database from './Icons/database.png';
import Email from './Icons/email.png';
import SysFiles from './Icons/administration.png';
import Font from './Icons/font.png';
import Image from './Icons/image.png';
import InternetThings from './Icons/browser.png';
import CLang from './Icons/icons8-c-programming-512.png';
import CppLang from './Icons/cpp.png';
import JavaLang from './Icons/java.png';
import JavaClass from './Icons/java.png';
import PythonLang from './Icons/python.png';
import Css from './Icons/css-3.png';
import Html from './Icons/html.png';
import Js from './Icons/js-format.png';
import Ts from './Icons/js-format.png';
import Ppts from './Icons/ppt.png';
import SpreedSheets from './Icons/xls.png';
import Video from './Icons/video-file.png';
import Docs from './Icons/google-docs.png';
import FolderIcon from './Icons/folderIcon.png';
import UnknownFileIcon from './Icons/fileIcon.png';
import Compressed from './Icons/zip.png';
const { ipcRenderer } = window.require('electron');
const path = window.require('path');
interface Props {
  filePath: string;
  isDirectory: boolean;
  width: string;
  ext: string;
}
const FileIcon = ({ filePath, isDirectory, width, ext }: Props) => {
  // console.log('FileIcon.tsx');
  const [imgSrc, setImgSrc] = useState('');
  let imgPath: string;
  // to get low quality macos native icons

  // useEffect(() => {
  //   if (!isDirectory) {
  //     ipcRenderer.send('getFileIcon', { filePath: filePath });
  //     ipcRenderer.on(`setFileIcon-${filePath}`, (event, data) => {
  //       console.log(data);
  //       setImgSrc(data);
  //     });
  //   } else {
  //     setImgSrc(FolderIcon);
  //   }
  // }, []);
  useEffect(() => {
    FileIconPath.forEach((element) => {
      if (element.extList.includes(ext.toLowerCase())) {
        imgPath = element.name;
      }
    });
    if (isDirectory) {
      setImgSrc(FolderIcon);
    } else {
      switch (imgPath) {
        case 'Audio':
          setImgSrc(Audio);
          break;
        case 'Video':
          setImgSrc(Video);
          break;
        case 'Text':
          setImgSrc(Text);
          break;
        case 'DiskImage':
          setImgSrc(DiskImage);
          break;
        case 'Database':
          setImgSrc(Database);
          break;
        case 'Email':
          setImgSrc(Email);
          break;
        case 'SysFiles':
          setImgSrc(SysFiles);
          break;
        case 'Font':
          setImgSrc(Font);
          break;
        case 'Image':
          setImgSrc(Image);
          break;
        case 'InternetThings':
          setImgSrc(InternetThings);
          break;
        case 'CLang':
          setImgSrc(CLang);
          break;
        case 'CppLang':
          setImgSrc(CppLang);
          break;
        case 'JavaLang':
          setImgSrc(JavaLang);
          break;
        case 'JavaClass':
          setImgSrc(JavaClass);
          break;
        case 'PythonLang':
          setImgSrc(PythonLang);
          break;
        case 'Css':
          setImgSrc(Css);
          break;
        case 'Html':
          setImgSrc(Html);
          break;
        case 'Js':
          setImgSrc(Js);
          break;
        case 'Ts':
          setImgSrc(Ts);
          break;
        case 'Ppts':
          setImgSrc(Ppts);
          break;
        case 'SpreedSheets':
          setImgSrc(SpreedSheets);
          break;
        case 'Docs':
          setImgSrc(Docs);
          break;
        case 'Compressed':
          setImgSrc(Compressed);
          break;
        default:
          setImgSrc(UnknownFileIcon);
          break;
      }
    }
  }, []);
  return (
    <>
      <img
        onDragStart={(e) => {
          e.preventDefault();
        }}
        className="file-icon"
        width={width}
        src={imgSrc}
        alt="Lala"
      />
    </>
  );
};

export default FileIcon;
