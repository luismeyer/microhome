import { Module } from "@telegram-home-assistant/types/dist";
import React from "react";
import styled from "styled-components";
import { useDbData } from "../hooks/use-db-data";

interface EditModuleProps {
  id: number;
}

const StyledInputLabel = styled.label`
  margin-right: 8px;
`;

export const EditModule: React.FC<EditModuleProps> = ({ id }) => {
  const module = useDbData<Module>(`services/db/module/${id}`);

  return (
    <>
      {module ? (
        <div>
          <StyledInputLabel>Module Name</StyledInputLabel>
          <input type="text" defaultValue={module.name} />
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
};
