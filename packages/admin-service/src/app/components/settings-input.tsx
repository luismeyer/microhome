import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useToken } from "../context/token";
import { useDbFetch } from "../hooks/use-db-fetch";

interface TokenInputProps {
  updateToken: (token: string) => void;
  updateStage: (stage: string) => void;
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledErrorSpan = styled.span`
  color: red;
`;

const StyledButton = styled.button`
  margin-top: 8px;
`;

export const SettingsInput: React.FC<TokenInputProps> = ({
  updateToken,
  updateStage,
}) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [stageInput, setStageInput] = useState("");

  const [error, setError] = useState("");

  const { token, stage } = useToken();

  const dbFetch = useDbFetch("admin");

  const handleSave = useCallback(() => {
    const newToken = btoa(`${username}:${password}`);

    dbFetch({ token: newToken }).then(async (res) => {
      const body = await res.json();

      if (!res.ok) {
        setError(body.error);
        return;
      }

      updateToken(newToken);
    });
  }, [username, password, setError, updateToken]);

  return (
    <StyledGrid>
      <StyledContainer>
        {!token ? (
          <>
            <label>Username</label>
            <input
              type="text"
              onChange={(event) => setUsername(event.target.value)}
            />

            <label>Password</label>
            <input
              type="text"
              onChange={(event) => setPassword(event.target.value)}
            />
            <StyledButton onClick={handleSave}>save token</StyledButton>
          </>
        ) : (
          <>
            <span>The DB Token is: {token}</span>
            <StyledButton onClick={() => updateToken("")}>logout</StyledButton>
          </>
        )}
        <StyledErrorSpan>{error}</StyledErrorSpan>
      </StyledContainer>

      <StyledContainer>
        <label>Current Stage: {stage}</label>
        {!Boolean(stage) && (
          <input
            type="text"
            onChange={(event) => setStageInput(event.target.value)}
          />
        )}
        <StyledButton onClick={() => updateStage(stage ? "" : stageInput)}>
          {stage ? "clear" : "save stage"}
        </StyledButton>
      </StyledContainer>
    </StyledGrid>
  );
};
