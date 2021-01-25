import { DB_SERVICE_URL } from "../const";
import { ModuleResponse } from "../database";
import { sendGet } from "../http";

export const getModules = async (): Promise<ModuleResponse[]> => {
  const url = `${DB_SERVICE_URL}module`;
  return sendGet(url).then((res) => res.ok && res.json());
};

export const findModuleByName = (name: string) =>
  getModules().then((modules) =>
    modules.find((module) => module.name.toLowerCase() === name.toLowerCase())
  );
