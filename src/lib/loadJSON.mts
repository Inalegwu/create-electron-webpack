import fs from "node:fs";

export const loadJSON = (path: string) => {
  return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)).toString());
};
