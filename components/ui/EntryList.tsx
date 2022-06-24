import { DragEvent, FC, useContext, useMemo } from "react"

import { List, Paper } from "@mui/material"

import { EntryCard } from "./"
import { EntryStatus } from "../../interfaces"
import { EntriesContext } from "../../context/entries"
import { UIContext } from "../../context/ui"

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList:FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext( EntriesContext );
  const { isDragging, setIsDragging } = useContext( UIContext )

  const entriesByStatus = useMemo(() => entries.filter( entry => entry.status === status ),[ entries, status ])

  const allowDrop = (e: DragEvent) => {
    e.preventDefault()
    const nativeEvent: any = e.nativeEvent
    nativeEvent.path.find((element: any) => element.id === 'list').classList.add(styles.dragging)
  }

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    const nativeEvent: any = e.nativeEvent
    nativeEvent.path.find((element: any) => element.id === 'list').classList.remove(styles.dragging)
  }

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const nativeEvent: any = e.nativeEvent
    nativeEvent.path.find((element: any) => element.id === 'list').classList.remove(styles.dragging)
    const id = e.dataTransfer.getData('text')
    const entry = entries.find( entry => entry._id === id )!

    setIsDragging(false)
    updateEntry({
      ...entry,
      status
    })
  }

  return (
    <div
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      onDragLeave={ onDragLeave }
      id='list'
      // className={ isDragging ? styles.dragging : '' }
    >
      <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px' }}>
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map( entry => (
              <EntryCard key={ entry._id } entry={ entry }/>
            ))
          }
        </List>
      </Paper>
    </div>
  )
}