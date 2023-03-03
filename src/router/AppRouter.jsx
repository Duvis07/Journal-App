import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      {/*    {Login and Register routes} */}
      <Route path="auth/*" element={<AuthRoutes />} />

      {/* {Journal routes} */}
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  );
};
