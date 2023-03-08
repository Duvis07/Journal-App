import React from "react";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";

//aqui se renderiza la aplicacion completa con el tema y el router
export const JournalApp = () => {
  return (
    <AppTheme>
      <AppRouter></AppRouter>
    </AppTheme>
  );
};
