import { useToken } from "../context/token";

interface CustomFetchPayload {
  init?: RequestInit;
  token?: string;
}

export const useDbFetch = (path: string) => {
  const { token, stage } = useToken();
  const url = `${stage ? "/" + stage : ""}/services/db/${path}`;

  return (payload?: CustomFetchPayload) =>
    fetch(url, {
      headers: { Authorization: `Basic ${payload?.token ?? token}` },
      ...(payload?.init ?? {}),
    });
};
