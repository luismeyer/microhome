import { Module } from "@telegram-home-assistant/types";
import React, { useState } from "react";
import styled from "styled-components";
import { useDbFetch } from "../hooks/use-db-fetch";
import {
  StyledModuleHeader,
  StyledModuleHeadline,
  StyledModuleGrid,
} from "./module";

interface EditModuleProps {
  readonly input?: Partial<Module>;
  readonly clearOnSave?: boolean;
  readonly onSubmit: () => Promise<void>;
  readonly onDelete?: () => Promise<void>;
  readonly hideInput?: () => void;
}

interface DisabledProps {
  disabled: boolean;
}

const StyledInputLabel = styled.label<DisabledProps>`
  margin-right: 8px;
  color: ${(props) => props.disabled && "#dddddd"};
`;

const StyledInput = styled.input`
  width: 100%;
`;

const StyledDeleteButton = styled.button`
  margin-left: 8px;
`;

const FUNCTIONS_SEPERATOR = ";";

export const ModuleInput: React.FC<EditModuleProps> = ({
  input,
  onSubmit,
  onDelete,
  hideInput,
}) => {
  const { id, name, serviceUrl, functions, baseAction } = input ?? {};

  const [idInput, setIdInput] = useState(id?.toString() ?? "");

  const [nameInput, setNameInput] = useState(name ?? "");
  const [serviceUrlInput, setServiceUrlInput] = useState(serviceUrl ?? "");
  const [functionsInput, setFunctionsInput] = useState(
    functions?.join(FUNCTIONS_SEPERATOR) ?? ""
  );
  const [baseActionInput, setBaseActionInput] = useState(baseAction ?? "");

  const [loading, setLoading] = useState(false);

  const createFetch = useDbFetch("module");
  const deleteFetch = useDbFetch(`module/${id}`);

  const handleSubmit = () => {
    setLoading(true);

    createFetch({
      init: {
        method: "post",
        body: JSON.stringify({
          id: parseInt(idInput),
          name: nameInput,
          serviceUrl: serviceUrlInput,
          functions: functionsInput?.split(FUNCTIONS_SEPERATOR) ?? [],
          baseAction: baseActionInput,
        }),
      },
    }).then(async () => {
      await onSubmit();
      setLoading(false);
      clearInputs();

      if (hideInput) {
        hideInput();
      }
    });
  };

  const handleDelete = () => {
    setLoading(true);

    deleteFetch({
      init: {
        method: "delete",
      },
    }).then(async () => {
      setLoading(false);

      if (hideInput) {
        hideInput();
      }

      if (onDelete) {
        await onDelete();
      }
    });
  };

  const clearInputs = () => {
    setIdInput("");
    setNameInput("");
    setServiceUrlInput("");
    setFunctionsInput("");
    setBaseActionInput("");
  };

  return module ? (
    <>
      <StyledModuleHeader>
        <StyledModuleHeadline>
          {id && name ? `${id} - ${name}` : "New Module"}
        </StyledModuleHeadline>
        <button onClick={handleSubmit}>save</button>
        {onDelete && (
          <StyledDeleteButton onClick={handleDelete}>delete</StyledDeleteButton>
        )}
      </StyledModuleHeader>
      <StyledModuleGrid>
        {!id && (
          <div>
            <StyledInputLabel disabled={loading}>Module ID</StyledInputLabel>
            <StyledInput
              type="text"
              value={idInput}
              disabled={loading}
              onChange={(e) => setIdInput(e.target.value)}
            />
          </div>
        )}

        <div>
          <StyledInputLabel disabled={loading}>Module Name</StyledInputLabel>
          <StyledInput
            type="text"
            value={nameInput}
            disabled={loading}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>

        <div>
          <StyledInputLabel disabled={loading}>Service Url</StyledInputLabel>
          <StyledInput
            type="text"
            value={serviceUrlInput}
            disabled={loading}
            onChange={(e) => setServiceUrlInput(e.target.value)}
          />
        </div>

        <div>
          <StyledInputLabel disabled={loading}>
            Functions (seperate list items with '{FUNCTIONS_SEPERATOR}')
          </StyledInputLabel>
          <StyledInput
            type="text"
            value={functionsInput}
            disabled={loading}
            onChange={(e) => setFunctionsInput(e.target.value)}
          />
        </div>

        <div>
          <StyledInputLabel disabled={loading}>Base action</StyledInputLabel>
          <StyledInput
            type="text"
            value={baseActionInput}
            disabled={loading}
            onChange={(e) => setBaseActionInput(e.target.value)}
          />
        </div>
      </StyledModuleGrid>
    </>
  ) : (
    <span>loading...</span>
  );
};
