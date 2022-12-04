export interface IElectronAPI {
  openExternal: (arg: string) => Promise<void>;
}

declare global {
  interface Window {
    myAPI: IElectronAPI;
  }
}
