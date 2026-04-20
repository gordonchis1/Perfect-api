import { defaultUserConfig } from "../defaultConfig";
import { migrations } from "./migrations";

export default function migrate(userConfig) {
  const currentVersion = defaultUserConfig.configVersion;
  const userVersion = userConfig.configVersion;

  if (userVersion == currentVersion) return userConfig;

  let config = { ...userConfig };

  for (let v = userVersion + 1; v <= currentVersion; v++) {
    const migrate = migrations[v];
    if (migrate) {
      config = migrate(config);
    }
  }

  return config;
}
