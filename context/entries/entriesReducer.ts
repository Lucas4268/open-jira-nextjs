import { EntriesState } from './';
import { Entry } from '../../interfaces';


  type EntriesActionType = 
  | { type: '[ENTRIES] Add-Entry', payload: Entry }
  | { type: '[ENTRIES] Update-Entry', payload: Entry }
  | { type: '[ENTRIES] Refresh-Data', payload: Entry[] }
  | { type: '[ENTRIES] Delete-Entry', payload: string }

  export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

    switch ( action.type ) {
    case '[ENTRIES] Refresh-Data':
      return {
        ...state,
        entries: action.payload
      }

      case '[ENTRIES] Add-Entry':
        return {
          ...state,
          entries: [
            ...state.entries,
            action.payload
          ]
        }

      case '[ENTRIES] Update-Entry':
        return {
          ...state,
          entries: state.entries.map( entry => ( entry._id === action.payload._id ) ? action.payload : entry)
        }

      case '[ENTRIES] Delete-Entry':
        return {
          ...state,
          entries: state.entries.filter( entry => entry._id !== action.payload)
        }

      default:
        return state;
  }
}