import React from 'react';
import Selecto from 'react-selecto';
import { useAppDispatch } from 'renderer/app/hooks';
import { updateSelection } from 'renderer/features/main/fileManagerSlice';
const SelectoComponent = () => {
  const dispatch = useAppDispatch();
  const selected = new Set<string>([]);
  const dragEndHandler = () => {
    const tempSelected: string[] = [];
    selected.forEach((element) => {
      tempSelected.push(element);
    });
    dispatch(updateSelection(tempSelected));
  };
  return (
    <div>
      <Selecto
        dragContainer="#body-container"
        selectableTargets={['.body-files-container .file-display']}
        selectByClick
        preventDragFromInside
        continueSelect={false}
        toggleContinueSelect="shift"
        selectFromInside={false}
        hitRate={100}
        ratio={0}
        onDragEnd={dragEndHandler}
        onSelect={(e) => {
          e.added.forEach((el) => {
            selected.add(el.id);
            el.classList.add('file-selected-grid');
          });
          e.removed.forEach((el) => {
            el.classList.remove('file-selected-grid');
            selected.delete(el.id);
          });
        }}
      />
    </div>
  );
};

export default SelectoComponent;
