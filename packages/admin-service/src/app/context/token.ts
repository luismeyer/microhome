import React, { useContext } from "react";

export interface ITokenContext {
  token?: string;
  stage?: string;
}

export const TokenContext = React.createContext<ITokenContext>({});

export const useToken = () => {
  const token = useContext(TokenContext);
  return token;
};
