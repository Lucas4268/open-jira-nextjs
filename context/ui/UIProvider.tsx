import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
}

interface Props {
  children: JSX.Element;
}

export const UIProvider:FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE );

  const openSideMenu = () => {
    dispatch({ type: '[UI] Open Sidebar' });
  }

  const closeSideMenu = () => {
    dispatch({ type: '[UI] Close Sidebar' });
  }

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: '[UI] Is Adding Entry', payload: isAdding });
  }

  const setIsDragging = (isDragging: boolean) => {
    dispatch({ type: '[UI] Toggle Dragging', payload: isDragging });
  }


  return (
    <UIContext.Provider value={{
      ...state,
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,
      setIsDragging,
    }}>
      { children }
    </UIContext.Provider>
  )
}