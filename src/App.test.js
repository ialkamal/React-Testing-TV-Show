import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import { res } from "./data/res";

jest.mock("./api/fetchShow");

test("check App is rendering correctly", async () => {
  mockFetchShow.mockResolvedValueOnce(res);

  const { getByText, getByTestId } = render(<App />);

  expect(getByText(/Fetching data.../i)).toBeInTheDocument();

  const selection = await waitFor(() => {
    getByTestId("seasons");
  });

  userEvent.selectOptions(select, /Season 1/i).click();
});
