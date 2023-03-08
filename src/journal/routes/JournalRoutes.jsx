import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { JournalPage } from "../pages/JournalPage";

///Aca esta la ruta de la pagina principal de la aplicacion del JournalPage
export const JournalRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<JournalPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
