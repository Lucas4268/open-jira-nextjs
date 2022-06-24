import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { FC, useEffect, useReducer } from 'react';
import { entriesApi } from '../../services';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';


export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: JSX.Element;
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: []
}

export const EntriesProvider:FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE );
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const addNewEntry = async (description: string) => {

    const { data: newEntry } = await entriesApi.post<Entry>('/entries', { description });
    dispatch({ type: '[ENTRIES] Add-Entry', payload: newEntry });

  }

  const updateEntry = async (entry: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, entry);
      dispatch({ type: '[ENTRIES] Update-Entry', payload: data });

      showSnackbar && enqueueSnackbar('Entrada actualizada', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  
  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')

    dispatch({ type: '[ENTRIES] Refresh-Data', payload: data });
  }

  useEffect(() => {
    refreshEntries()
  }, [])


  const deleteEntry = async (entryId: string) => {
    await entriesApi.delete(`/entries/${entryId}`)

    dispatch({ type: '[ENTRIES] Delete-Entry', payload: entryId });
    enqueueSnackbar('Entrada eliminada', {
      variant: 'error',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    router.replace('/')
  }

  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry,
      updateEntry,
      deleteEntry
    }}>
      { children }
    </EntriesContext.Provider>
  )
}
