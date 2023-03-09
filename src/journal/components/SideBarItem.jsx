import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { setActiveNote } from "../../store/journal";

//RECIBE COMO PROPIEDADES EL TITULO, EL CUERPO, LA FECHA, EL ID Y LAS URL DE LAS IMAGENES
export const SideBarItem = ({ title = "", body, id, date, imageUrls = [] }) => {
    
    //se obtiene el dispatch para poder ejecutar la accion de setActiveNote
  const dispatch = useDispatch();

  //se activa cuando la persona hace click en una nota del sidebar y se va a ejecutar la accion de setActiveNote
  //va a enviar como argumento el titulo, el cuerpo, el id, la fecha y las url de las imagenes
  const onClickNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };

  //se usa el hook useMemo para que no se vuelva a renderizar el componente si el titulo no cambia
  //si el tamaño del titulo es mayor a 17 caracteres entonces se corta el titulo y se le agrega 3 puntos al final
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
