import { defaultUserConfig } from "../defaultConfig";

export default function fillMissings(
  userConfig,
  defaultConfig = defaultUserConfig,
  isRoot = true
) {
  const result = {};

  for (const key in defaultConfig) {
    const userVal = userConfig[key];
    const defaultVal = defaultConfig[key];

    const bothObjects =
      typeof userVal === "object" &&
      userVal !== null &&
      !Array.isArray(userVal) &&
      typeof defaultVal === "object" &&
      defaultVal !== null &&
      !Array.isArray(defaultVal);

    if (bothObjects) {
      result[key] = fillMissings(userVal, defaultVal, false);
    } else {
      result[key] = userVal !== undefined ? userVal : defaultVal;
    }
  }

  if (isRoot) {
    result.configVersion = defaultConfig.configVersion;
  }

  return result;
}
