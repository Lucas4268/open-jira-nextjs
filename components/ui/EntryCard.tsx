import { DragEvent, FC, useContext } from "react"

import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

import { Entry } from "../../interfaces"
import { UIContext } from "../../context/ui"
import { useRouter } from "next/router"
import { dateFunctions } from "../../utils"

interface Props {
  entry: Entry
}

export const EntryCard:FC<Props> = ({ entry }) => {

  const { setIsDragging } = useContext( UIContext );
  const router = useRouter()

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData('text', entry._id)
    setIsDragging(true)
  }

  const onDragEnd = () => {
    setIsDragging(false)
  }

  const onClick = () => {
    router.push(`/entries/${ entry._id }`)
  }

  return (
    <Card
      onClick={ onClick }
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={ onDragStart }
      onDragEnd={ onDragEnd }
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant="body2">{ dateFunctions.getFormatDistance(entry.createdAt) }</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}