import React from "react";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";

//Aca esta la vista de la pagina principal de la aplicacion donde se va a mostrar el componente de la nota seleccionada o el componente de no hay nota seleccionada
export const JournalPage = () => {
  //se obtiene el dispatch para poder ejecutar la accion de crear una nueva nota
  const dispatch = useDispatch();

  //se obtiene el estado de la nota seleccionada para deshabilitar el boton de nueva nota
  //El active me ayuda a saber si hay una nota seleccionada o no y me ayuda a mostrar el componente de nota seleccionada o el componente de no hay nota seleccionada
  const { isSaving, active } = useSelector((state) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  //Aca se muestra el componente de la nota seleccionada o el componente de no hay nota seleccionada dependiendo de si hay una nota seleccionada o no
  // si esta una nota entonces se muestra el componente de la nota seleccionada y si no hay una nota seleccionada se muestra el componente de no hay nota seleccionada
  return (
    <JournalLayout>
      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
