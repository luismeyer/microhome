import { useEffect, useState } from "react";
import { useToken } from "../context/token";
import { useDbFetch } from "./use-db-fetch";

export const useDbData = <T>(path: string) => {
  const [data, setData] = useState<T>();
  const { token, stage } = useToken();

  const dbFetch = useDbFetch(path);

  useEffect(() => {
    dbFetch().then(async (res) => {
      if (!res.ok) {
        setData(undefined);
        return;
      }

      setData(await res.json());
    });
  }, [token, stage]);

  return data;
};
