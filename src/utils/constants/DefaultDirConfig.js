import { nanoid } from "nanoid";

export const DEFAULT_DIR_CONFIG = {
  type: "GET",
  variables: [{ key: "", value: "", id: nanoid() }],
};
