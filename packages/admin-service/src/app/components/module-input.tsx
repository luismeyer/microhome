import { Module } from "@telegram-home-assistant/types";
import React, { useState } from "react";
import styled from "styled-components";
import { useDbFetch } from "../hooks/use-db-fetch";
import {
  StyledModuleHeader,
  StyledModuleHeadline,
  StyledModuleGrid,
} from "./module";

interface EditModuleProps extends Partial<Module> {
  onSubmit?: () => void;
}

const StyledInputLabel = styled.label`
  margin-right: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
`;

export const ModuleInput: React.FC<EditModuleProps> = ({
  id,
  name,
  serviceUrl,
  functions,
  baseAction,
  onSubmit,
}) => {
  const [idInput, setIdInput] = useState(id);
  const [nameInput, setNameInput] = useState(name);
  const [serviceUrlInput, setServiceUrlInput] = useState(serviceUrl);
  const [functionsInput, setFunctionsInput] = useState(
    functions?.join(";") ?? ""
  );
  const [baseActionInput, setBaseActionInput] = useState(baseAction);

  const dbFetch = useDbFetch("module");

  const handleSubmit = () => {
    dbFetch({
      init: {
        method: "post",
        body: JSON.stringify({
          id: idInput,
          name: nameInput,
          serviceUrl: serviceUrlInput,
          functions: functionsInput?.split(";") ?? [],
          baseAction: baseActionInput,
        }),
      },
    }).then(onSubmit);
  };

  return module ? (
    <>
      <StyledModuleHeader>
        <StyledModuleHeadline>
          {id && name ? `${id}-${name}` : "New Module"}
        </StyledModuleHeadline>
        <button onClick={handleSubmit}>save</button>
      </StyledModuleHeader>
      <StyledModuleGrid>
        <div>
          <StyledInputLabel>
            Module Id {id && "(BE CAREFUL CHANGING THIS)"}
          </StyledInputLabel>
          <StyledInput
            type="number"
            defaultValue={id}
            onChange={(e) => setIdInput(parseInt(e.target.value))}
          />
        </div>

        <div>
          <StyledInputLabel>Module Name</StyledInputLabel>
          <StyledInput
            type="text"
            defaultValue={name}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>

        <div>
          <StyledInputLabel>Service Url</StyledInputLabel>
          <StyledInput
            type="text"
            defaultValue={serviceUrl}
            onChange={(e) => setServiceUrlInput(e.target.value)}
          />
        </div>

        <div>
          <StyledInputLabel>Functions</StyledInputLabel>
          <StyledInput
            type="text"
            defaultValue={functions?.join(";") ?? ""}
            onChange={(e) => setFunctionsInput(e.target.value)}
          />
        </div>

        <div>
          <StyledInputLabel>Base action</StyledInputLabel>
          <StyledInput
            type="text"
            defaultValue={baseAction}
            onChange={(e) => setBaseActionInput(e.target.value)}
          />
        </div>
      </StyledModuleGrid>
    </>
  ) : (
    <span>loading...</span>
  );
};
