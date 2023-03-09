import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startSaveNote } from "../../store/journal";
import { ImageGallery } from "../components";

//Aca esta la vista de la nota que se va a mostrar en la aplicacion cuando se haya creado una nota
export const NoteView = () => {

  const dispatch = useDispatch();

  const { active: note  , messageSaved } = useSelector((state) => state.journal);

  //se obtiene el body y el title de la nota seleccionada y se le pasa como argumento a la funcion useForm
  const { body, title, date, onInputChange, formState } = useForm(note);

  //se obtiene la fecha de la nota seleccionada y se le pasa como argumento a la funcion useMemo
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);


  const fileInputRef = useRef();

  //obtiene la nota activa y la guarda en el store de forma actualizada
  useEffect(() => {
      dispatch( setActiveNote(formState) );
  }, [formState])

  useEffect(() => {
    if ( messageSaved.length > 0 ) {
        Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved])
  
  

  const onSaveNote = () => {
      dispatch( startSaveNote() );
  }

  const onFileInputChange = ({ target }) => {
      if( target.files === 0 ) return;
      dispatch( startUploadingFiles( target.files ) );
  }

  const onDelete = () => {
      dispatch( startDeletingNote() );
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <Button
        onClick={onSaveNote}
         color="primary" 
         sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      {/* Image gallery */}
      <ImageGallery />
    </Grid>
  );
};
