export type CallbackData = {
  action: number;
  id: string;
  function?: string;
};

export const callbackDataId = (moduleId: number, deviceId: string) =>
  `${moduleId}::${deviceId}`;

export const getCallbackDataId = (callbackData: CallbackData) => {
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
  func?: string
): CallbackData => ({
  action,
  id: callbackDataId(moduleId, deviceId),
  function: func,
});
