import React from "react";
import { render, wait, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import { res } from "./data/res";

jest.mock("./api/fetchShow");

test("check App is rendering correctly", async () => {
  mockFetchShow.mockResolvedValueOnce(res);

  const { queryAllByText, getAllByTestId, getByText } = render(<App />);

  expect(getByText(/Fetching data.../i)).toBeInTheDocument();

  await waitFor(() => {
    expect(getByText(/select a season/i)).toBeInTheDocument();
  });

  const selection = await getByText(/select a season/i);
  userEvent.click(selection);

  const season1 = await getByText(/season 1/i);
  userEvent.click(season1);

  expect(getAllByTestId(/episode/i)).toHaveLength(8);

  userEvent.click(queryAllByText(/season 1/i)[0]);
  const season4 = await getByText(/season 4/i);
  userEvent.click(season4);
  expect(getAllByTestId(/episode/i)).toHaveLength(3);
});
