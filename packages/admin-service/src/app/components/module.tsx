import { Module as ModuleType } from "@telegram-home-assistant/types/dist";
import React from "react";
import styled from "styled-components";
import { EditModule } from "./edit-module";

interface ModuleProps {
  module: ModuleType;
}

const StyledModule = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

export const Module: React.FC<ModuleProps> = ({ module }) => {
  const [editing, setEditing] = React.useState(false);

  return (
    <StyledModule key={module.id}>
      {editing ? (
        <EditModule id={module.id} />
      ) : (
        <>
          <h3>
            {module.id} - {module.name}
          </h3>
          <span>
            Service Url: <a href={module.serviceUrl}>{module.serviceUrl}</a>
          </span>
          <span>Functions: {module.functions.join(" | ")}</span>
          <span>Base action: {module.baseAction}</span>
        </>
      )}

      <button onClick={() => setEditing(!editing)}>
        {editing ? "save" : "edit"}
      </button>
    </StyledModule>
  );
};
