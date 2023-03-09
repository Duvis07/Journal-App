import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

// el sidebar se va a mostrar en todas las vistas de la aplicacion menos en el login y el registro
//este se va mostrar de forma vertical en la parte izquierda de la aplicacion y se va a mostrar el nombre del usuario que esta autenticado
// y va a mostrar una lista de meses del año y cada mes va a tener un titulo y una descripcion o las notas que se hayan guardado en ese mes
export const SideBar = ({ drawerWidth = 240 }) => {
  //se desea obtener el nombre del usuario que esta autenticado para mostrarlo en el sidebar y se va a usar el hook useSelector
  const { displayName } = useSelector((state) => state.auth);

  //se desea obtener las notas que se hayan guardado en el store para mostrarlas en el sidebar y se va a usar el hook useSelector
  const { notes } = useSelector((state) => state.journal);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" // temporary
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
