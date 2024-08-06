import React from "react";
import Sidebar from "./navbar/Sidebar";
import ApplyDoctor from "./pages/ApplyDoctor";
import Navbar from "./navbar/Navbar";

const Wrap = () => {
  return (
    <Sidebar>
      <Navbar>
        <ApplyDoctor />
      </Navbar>
    </Sidebar>
  );
};

export default Wrap;
