import { ServiceRequest } from "./services/typings";

export type FunctionsResponse = {
  functions: string[];
  serviceRequest: ServiceRequest;
};

export type ModuleResponse = {
  name: string;
  id: number;
  serviceRequest: ServiceRequest;
};
