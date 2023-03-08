import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Navbar, SideBar } from "../components";

//Aca esta el layout de la aplicacion toda la parte de diseño de la aplicacion de la parte de la barra de navegacion y el sidebar
const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn animate__faster">
      <Navbar drawerWidth={drawerWidth} />

      <SideBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
