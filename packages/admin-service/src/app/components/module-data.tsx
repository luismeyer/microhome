import React from "react";
import {
  StyledModuleGrid,
  StyledModuleHeader,
  StyledModuleHeadline,
} from "./module";
import { Module } from "@telegram-home-assistant/types";
import { useDbFetch } from "../hooks/use-db-fetch";

interface ModuleDataProps extends Module {
  refetch: () => void;
  onSubmit: () => void;
}

export const ModuleData: React.FC<ModuleDataProps> = ({
  name,
  id,
  refetch,
  serviceUrl,
  functions,
  baseAction,
  onSubmit,
}) => {
  const dbFetch = useDbFetch(`module/${id}`);

  const onDelete = () => {
    dbFetch({
      init: {
        method: "delete",
      },
    }).then(refetch);
  };

  return (
    <>
      <StyledModuleHeader>
        <StyledModuleHeadline>
          {id} - {name}
        </StyledModuleHeadline>
        <button onClick={onSubmit}>edit</button>
        <button onClick={onDelete}>delete</button>
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
