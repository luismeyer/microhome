import { ServiceRequest } from "telegram-home-assistant-types";
import { sendPost } from "../utils/http";

export const makeServiceRequest = async <T>(
  serviceRequest: ServiceRequest
): Promise<T> => {
  const res = await sendPost(
    serviceRequest.serviceUrl,
    JSON.stringify(serviceRequest.body)
  );

  return res.json();
};
