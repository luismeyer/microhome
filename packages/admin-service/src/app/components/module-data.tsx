import React from "react";
import {
  StyledModuleGrid,
  StyledModuleHeader,
  StyledModuleHeadline,
} from "./module";
import { Module } from "@telegram-home-assistant/types";

interface ModuleDataProps extends Module {
  onSubmit: () => void;
}

export const ModuleData: React.FC<ModuleDataProps> = ({
  name,
  id,
  onSubmit,
  serviceUrl,
  functions,
  baseAction,
}) => {
  return (
    <>
      <StyledModuleHeader>
        <StyledModuleHeadline>
          {id} - {name}
        </StyledModuleHeadline>
        <button onClick={onSubmit}>edit</button>
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
