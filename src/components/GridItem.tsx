import React from "react";

interface GridItemProps {
  label: string;
}

const GridItem: React.FC<GridItemProps> = ({ label }) => {
  return <div className="grid-label">{label}</div>;
};

export default GridItem;
