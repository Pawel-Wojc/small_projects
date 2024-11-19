jest.mock("./View", () => {
  return {
    View: jest.fn().mockImplementation(() => ({
      Confirm: jest.fn(), // Mock Confirm as a function
      Select: jest.fn(),
      CheckBox: jest.fn(),
      Number: jest.fn(),
      ShowOrder: jest.fn(),
    })),
  };
});
