import { CallbackData } from "@microhome/types";

export const callbackDataId = (moduleId: number, deviceId: string) =>
  `${moduleId}::${deviceId}`;

export const getCallbackDataId = (callbackData: CallbackData) => {
  if (!callbackData.id) {
    return;
  }

  const [moduleId, deviceId] = callbackData.id.split("::");

  return {
    moduleId: parseInt(moduleId),
    deviceId,
  };
};

export const createCallbackData = (
  moduleId: number,
  deviceId: string,
  action: number,
  data?: string
): CallbackData => ({
  action,
  id: callbackDataId(moduleId, deviceId),
  data,
});
