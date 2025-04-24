import React from "react";
import IndexSidebar from "../components/IndexSidebar";
import IndexMobileSidebar from "../components/IndexMobileSidebar";
import useIsMobile from "../components/UseIsMobile";

function IndexResponsiveSidebar({ activePage }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <IndexMobileSidebar activePage={activePage} />
  ) : (
    <IndexSidebar activePage={activePage} />
  );
}

export default IndexResponsiveSidebar;
