type JsonData = {
  [key: string]:
  | string
  | number
  | boolean
  | Json
  | undefined
  | [string | number | boolean | JsonData | undefined];
};
type AsyncLoadState = 'UNLOADED' | 'LOADING' | 'LOADED' | 'ERROR';