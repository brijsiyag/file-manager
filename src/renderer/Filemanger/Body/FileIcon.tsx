import React from 'react';
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
interface Props {
  ext: string;
  isDirectory: boolean;
  view: string;
}
const FileIcon = ({ ext, isDirectory, width }: Props) => {
  // console.log('FileIcon.tsx');
  let imgSrc;
  let imgPath;
  FileIconPath.forEach((element) => {
    if (element.extList.includes(ext.toLowerCase())) {
      imgPath = element.name;
    }
  });
  if (isDirectory) {
    imgSrc = FolderIcon;
  } else {
    switch (imgPath) {
      case 'Audio':
        imgSrc = Audio;
        break;
      case 'Video':
        imgSrc = Video;
        break;
      case 'Text':
        imgSrc = Text;
        break;
      case 'DiskImage':
        imgSrc = DiskImage;
        break;
      case 'Database':
        imgSrc = Database;
        break;
      case 'Email':
        imgSrc = Email;
        break;
      case 'SysFiles':
        imgSrc = SysFiles;
        break;
      case 'Font':
        imgSrc = Font;
        break;
      case 'Image':
        imgSrc = Image;
        break;
      case 'InternetThings':
        imgSrc = InternetThings;
        break;
      case 'CLang':
        imgSrc = CLang;
        break;
      case 'CppLang':
        imgSrc = CppLang;
        break;
      case 'JavaLang':
        imgSrc = JavaLang;
        break;
      case 'JavaClass':
        imgSrc = JavaClass;
        break;
      case 'PythonLang':
        imgSrc = PythonLang;
        break;
      case 'Css':
        imgSrc = Css;
        break;
      case 'Html':
        imgSrc = Html;
        break;
      case 'Js':
        imgSrc = Js;
        break;
      case 'Ts':
        imgSrc = Ts;
        break;
      case 'Ppts':
        imgSrc = Ppts;
        break;
      case 'SpreedSheets':
        imgSrc = SpreedSheets;
        break;
      case 'Docs':
        imgSrc = Docs;
        break;
      case 'Compressed':
        imgSrc = Compressed;
        break;
      default:
        imgSrc = UnknownFileIcon;
        break;
    }
  }
  return (
    <>
      <img className="file-icon" width={width} src={imgSrc} alt="Lala" />
    </>
  );
};

export default FileIcon;
