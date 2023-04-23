import { loadJSON } from "../lib/loadJSON.mjs";

describe("loadJSON", () => {
  it("loads a valid JSON file", () => {
    const json = loadJSON("../../package.json");
    expect(json.name).toEqual("create-electron-webpack");
  });

  it("throws an error when the file is not valid JSON", () => {
    expect(() => loadJSON("./invalid.json")).toThrow();
  });

  it("throws an error when the file does not exist", () => {
    expect(() => loadJSON("./nonexistent.json")).toThrow();
  });
});
