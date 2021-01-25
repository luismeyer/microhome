import { sendPost } from "../http";
import { ServiceRequest } from "./typings";

export const makeServiceRequest = async <T>(
  serviceRequest: ServiceRequest
): Promise<T> => {
  const res = await sendPost(
    serviceRequest.serviceUrl,
    JSON.stringify(serviceRequest.body)
  );

  if (res && res.ok) {
    return res.json();
  }
};
