import React from "react";
import {
  StyledModuleGrid,
  StyledModuleHeader,
  StyledModuleHeadline,
} from "./module";
import { Module } from "@telehome/types";

interface ModuleDataProps {
  readonly onEdit: () => void;
  readonly data: Module;
}

export const ModuleData: React.FC<ModuleDataProps> = ({
  data: { name, id, serviceUrl, functions, baseAction },
  onEdit,
}) => {
  return (
    <>
      <StyledModuleHeader>
        <StyledModuleHeadline>
          {id} - {name}
        </StyledModuleHeadline>
        <button onClick={onEdit}>edit</button>
      </StyledModuleHeader>
      <StyledModuleGrid>
        <span>
          Service Url: <a href={serviceUrl}>{serviceUrl}</a>
        </span>
        <span>Functions: {functions.join(" ; ")}</span>
        <span>Base action: {baseAction}</span>
      </StyledModuleGrid>
    </>
  );
};
