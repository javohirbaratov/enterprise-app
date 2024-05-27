import React from "react";
import { Outlet } from "react-router-dom";
import SpringMode from "./spring/SpringMode";

function ThemeMode() {
  return (
    <>
      <SpringMode />

      <Outlet />
    </>
  );
}

export default ThemeMode;
