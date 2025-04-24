import React from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import useIsMobile from "../components/UseIsMobile"; // adjust path if needed

function ResponsiveSidebar({ activePage }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <MobileSidebar activePage={activePage} />
  ) : (
    <Sidebar activePage={activePage} />
  );
}

export default ResponsiveSidebar;
