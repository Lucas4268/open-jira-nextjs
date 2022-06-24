import { createContext } from 'react';


export interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  setIsDragging: (isDragging: boolean) => void;
}


export const UIContext = createContext({} as ContextProps);