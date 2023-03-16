import React from "react";
import Topbar from '../../components/Topbar/Topbar';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Topbar />
      <Navbar />

      <div class="wrapper">
        <Outlet />
      </div>
    </>
  );
}
