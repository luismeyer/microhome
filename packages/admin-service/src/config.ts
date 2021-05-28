const { STAGE } = process.env;

export const stageName = STAGE ?? "";
export const stageUrl = (stage = stageName) => (stage ? "/" + stage : "");

export const baseUrl = (stage: string) => stageUrl(stage) + "/services/admin";

export const assetsUrl = (stage: string) => baseUrl(stage) + "/assets";
