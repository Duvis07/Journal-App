import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";
import { purpleTheme } from "./purpleTheme";

//Aca esta el tema de la aplicacion que se usa en toda la aplicacion para que tenga el mismo estilo 
export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline>{children}</CssBaseline>
    </ThemeProvider>
  );
};
