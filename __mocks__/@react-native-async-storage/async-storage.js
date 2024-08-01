const virtualStorage = {};

const mock = {
  getItem: jest.fn().mockImplementation((key) => {
    return virtualStorage[key];
  }),
  setItem: jest.fn().mockImplementation((key, value) => {
    virtualStorage[key] = value;
  }),
  __clearJestMock: jest.fn().mockImplementation(() => {
    Object.keys(virtualStorage).forEach((key) => delete virtualStorage[key]);
  }),
};

export default mock;
