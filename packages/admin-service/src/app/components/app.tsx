import React from "react";
import styled from "styled-components";
import { TokenContext, ITokenContext } from "../context/token";
import { usePersistedState } from "../hooks/use-persisted-state";
import { CallbackDataList } from "./callback-data-list";
import { Modules } from "./modules";
import { SettingsInput } from "./settings-input";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
`;

export const App: React.FC = () => {
  const [settings, setSettings] = usePersistedState<ITokenContext>(
    "db-token",
    {}
  );

  return (
    <TokenContext.Provider value={settings}>
      <StyledContainer>
        <SettingsInput
          updateToken={(token) => setSettings({ ...settings, token })}
          updateStage={(stage) => setSettings({ ...settings, stage })}
        />
        <Modules />
        <CallbackDataList />
      </StyledContainer>
    </TokenContext.Provider>
  );
};
