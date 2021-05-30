import React from "react";
import {
  StyledModuleGrid,
  StyledModuleHeader,
  StyledModuleHeadline,
  transformFunctionObject,
} from "./module";
import { Module } from "@microhome/types";

interface ModuleDataProps {
  readonly onEdit: () => void;
  readonly data: Module;
}

export const ModuleData: React.FC<ModuleDataProps> = ({
  data: { name, id, serviceUrl, functions, baseFunction },
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
        <span>
          Functions: {functions.map(transformFunctionObject).join(" ; ")}
        </span>
        <span>Base function: {transformFunctionObject(baseFunction)}</span>
      </StyledModuleGrid>
    </>
  );
};
