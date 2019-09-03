import React from "react";
import { mount } from "enzyme";
import App from "../App";

describe("<App />", () => {
  beforeEach(() => {
    const mockUserData = [
      {
        name: "Nicholas M. Vogel",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/peterme/128.jpg",
        id: 40,
        occupation: "Electromechanical equipment assembler",
        impressions: 961,
        conversions: 302,
        revenue: 15804.730000000005,
        conversionDates: "Object"
      }
    ];

    const mockSuccessResponse = mockUserData;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise); // 4
  });

  it("matches snapshot", () => {
    const app = mount(<App />);
    expect(app).toMatchSnapshot();
  });

  it("calls fetch with the right url", () => {
    const app = mount(<App />);
    const expectedUrl = "/api/users?page=1&limit=12&ascending=true";

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
  });
});
