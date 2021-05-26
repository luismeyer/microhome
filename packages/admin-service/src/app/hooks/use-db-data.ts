import { useEffect, useState } from "react";
import { useToken } from "../context/token";
import { useDbFetch } from "./use-db-fetch";

export const useDbData = <T>(
  path: string
): [T | undefined, () => Promise<void>] => {
  const [data, setData] = useState<T>();
  const { token, stage } = useToken();

  const dbFetch = useDbFetch(path);

  const fetchData = () =>
    dbFetch().then(async (res) => {
      if (!res.ok) {
        setData(undefined);
        return;
      }

      setData(await res.json());
    });

  useEffect(() => {
    fetchData();
  }, [token, stage]);

  return [data, fetchData];
};
