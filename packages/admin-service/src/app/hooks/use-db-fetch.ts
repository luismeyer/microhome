import { useToken } from "../context/token";

interface CustomFetchPayload {
  init?: RequestInit;
  token?: string;
}

export const useDbFetch = (path: string) => {
  const { token, stage } = useToken();

  return (payload?: CustomFetchPayload) =>
    fetch(`${stage ? "/" + stage : ""}/${path}`, {
      headers: { Authorization: `Basic ${payload?.token ?? token}` },
      ...(payload?.init ?? {}),
    });
};
