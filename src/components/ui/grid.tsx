import React, { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  className?: string;
  size?: string;
}

interface ColProps {
  children: ReactNode;
  className?: string;
}

interface GridComponent extends React.FC<GridProps> {
  Col: React.FC<ColProps>;
}

const Grid: GridComponent = ({ children, className = "", size }) => {
  return (
    <div
      className={`flex flex-wrap ${className} 
  ${!size ? "-mx-2 2xl:-mx-2.5 [&>*]:px-2 2xl:[&>*]:px-2.5" : ""} 
  ${size === "lg" ? "-mx-1.5 md:-mx-2.5 2xl:-mx-3.5 [&>*]:px-1.5 [&>*]:md:px-2.5 [&>*]:2xl:px-3.5" : ""}
  ${size === "md" ? "-mx-1.5 [&>*]:px-1.5 lg:-mx-2 lg:[&>*]:px-2" : ""}
  ${size === "sm" ? "-mx-1 [&>*]:px-1 lg:-mx-1.5 lg:[&>*]:px-1.5" : ""}
  ${size === "xs" ? "-mx-0.5 md:-mx-1 [&>*]:px-0.5 md:[&>*]:px-1" : ""}
  ${size === "tiny" ? "-mx-0.5 [&>*]:px-0.5" : ""}
  ${size === "zero" ? "mx-0 [&>*]:px-0" : ""} `}
    >
      {children}
    </div>
  );
};

const Col: React.FC<ColProps> = ({ children, className = "" }) => {
  return <div className={`${className} w-full`}>{children}</div>;
};

Grid.Col = Col;

export default Grid;
