import { ChangeEvent, useContext, useState } from "react";

import { Button, TextField, Box } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  
  const { addNewEntry } = useContext( EntriesContext )
  const { setIsAddingEntry, isAddingEntry } = useContext( UIContext )
  
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)
  

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onCancel = () => {
    setIsAddingEntry(false)
    setInputValue('')
    setTouched(false)
  }

  const onSave = () => {
    if (inputValue.trim().length === 0)  return
    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setInputValue('')
    setTouched(false)
  }


  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {
        isAddingEntry ? (
          <>
            <TextField
              fullWidth
              sx={{
                marginTop: 2,
                marginBottom: 1
              }}
              placeholder="Nueva entrada"
              autoFocus
              label="Nueva entrada"
              multiline
              helperText={ inputValue.length <= 0 && touched && "Ingrese un valor" }
              error={ inputValue.length <= 0 && touched }
              value={ inputValue }
              onChange={ onTextFieldChange }
              onBlur={ () => setTouched(true) }
            />

            <Box display='flex' justifyContent='space-between'>
              <Button
                variant="text"
                onClick={ onCancel }
              >
                Cancelar  
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                endIcon={ <SaveOutlinedIcon /> }
                onClick={ onSave }
              >
                Guardar  
              </Button>
            </Box>
          </>
        ) : (
          <Button
            startIcon={ <AddCircleOutlineOutlinedIcon /> }
            fullWidth
            variant="outlined"
            onClick={ () => setIsAddingEntry(true) }
          >
            Agregar Tarea
          </Button>
        )
      }      
    </Box>
  )
}