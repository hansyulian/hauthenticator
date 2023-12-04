const virtualStorage = {

}

export const getItemAsync = jest.fn().mockImplementation(async (key) => {
  return virtualStorage[key];
})
export const setItemAsync = jest.fn().mockImplementation(async (key, value) => {
  virtualStorage[key] = value;
})
export const __clearJestMock = jest.fn().mockImplementation(() => {
  Object.keys(virtualStorage).forEach((key) => delete virtualStorage[key]);
})
