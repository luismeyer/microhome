import { CallBackData } from "@microhome/types";
import React from "react";
import styled from "styled-components";
import { useDbData } from "../hooks/use-db-data";

const StyledSpan = styled.span`
  margin-left: 8px;
`;

export const CallbackDataList: React.FC = () => {
  const [callbackData] = useDbData<CallBackData[]>(`callbackdata/`);

  return (
    <div>
      <h2>CallbackData:</h2>
      {callbackData?.map((data) => (
        <div>
          <span>{data.id}</span>
          <StyledSpan>Action: {data.action}</StyledSpan>
          <StyledSpan>Device Id: {data.deviceId ?? "-"}</StyledSpan>
          <StyledSpan>Module Id:{data.moduleId ?? "-"}</StyledSpan>
        </div>
      ))}
    </div>
  );
};
