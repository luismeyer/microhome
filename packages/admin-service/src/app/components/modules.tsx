import React from "react";
import { useDbData } from "../hooks/use-db-data";
import styled from "styled-components";
import { Module } from "./module";
import { Module as ModuleType } from "@telegram-home-assistant/types";
import { ModuleInput } from "./module-input";

const StyledModuleList = styled.div`
  padding: 0;
  margin-bottom: 64px;
`;

export const Modules: React.FC = () => {
  const [modules, refetchModules] = useDbData<ModuleType[]>("module");

  return (
    <div>
      <StyledModuleList>
        {modules && (
          <>
            <h2>All Modules</h2>
            {modules?.map((module) => (
              <Module key={module.id} id={module.id} />
            ))}
          </>
        )}
      </StyledModuleList>
      <ModuleInput onSubmit={() => refetchModules()} />
    </div>
  );
};
