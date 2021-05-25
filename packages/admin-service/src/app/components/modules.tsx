import React from "react";
import { useDbData } from "../hooks/use-db-data";
import styled from "styled-components";
import { Module } from "./module";
import { Module as ModuleType } from "@telegram-home-assistant/types/dist";

const StyledModuleList = styled.ul`
  padding: 0;
`;

export const Modules: React.FC = () => {
  const modules = useDbData<ModuleType[]>("services/db/module");

  return (
    <div>
      {modules && (
        <StyledModuleList>
          <h2>Modules</h2>
          {modules?.map((module) => (
            <Module module={module} />
          ))}
        </StyledModuleList>
      )}
    </div>
  );
};
