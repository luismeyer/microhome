import { Module as ModuleType } from "@telegram-home-assistant/types";
import React from "react";
import styled from "styled-components";
import { useDbData } from "../hooks/use-db-data";
import { ModuleData } from "./module-data";
import { ModuleInput } from "./module-input";

interface ModuleProps {
  id: number;
}

const StyledModule = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

export const StyledModuleHeadline = styled.h3`
  margin: 0px;
  margin-right: 12px;
`;

export const StyledModuleHeader = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-items: center;
`;

export const StyledModuleGrid = styled.div`
  display: grid;
  grid-gap: 4px;
`;

export const Module: React.FC<ModuleProps> = ({ id }) => {
  const [module, refetchModule] = useDbData<ModuleType>(`module/${id}`);

  const [editing, setEditing] = React.useState(false);

  if (!module) {
    return null;
  }

  return (
    <StyledModule>
      {editing ? (
        <ModuleInput
          input={module}
          clearOnSave
          onSubmit={refetchModule}
          onDelete={refetchModule}
          hideInput={() => setEditing(false)}
        />
      ) : (
        <ModuleData data={module} onEdit={() => setEditing(true)} />
      )}
    </StyledModule>
  );
};
