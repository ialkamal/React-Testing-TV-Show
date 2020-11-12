import React from "react";
import { render, wait, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import { res } from "./data/res";

jest.mock("./api/fetchShow");

test("check App is rendering correctly", async () => {
  //ARRANGE: Have mock data ready as well as render app
  mockFetchShow.mockResolvedValueOnce(res);
  const { queryAllByText, getAllByTestId, getByText } = render(<App />);

  //ACT & ASSERT: Make sure that we are fetching data
  expect(getByText(/Fetching data.../i)).toBeInTheDocument();

  //ACT & ASSERT: Make sure that we wait for dropdown to populate
  await waitFor(() => {
    expect(getByText(/select a season/i)).toBeInTheDocument();
  });

  //ACT: Select Season 1 from Dropdown
  const selection = getByText(/select a season/i);
  userEvent.click(selection);
  const season1 = getByText(/season 1/i);
  userEvent.click(season1);

  //ASSERT: assert that season 1 has 8 episodes
  expect(getAllByTestId(/episode/i)).toHaveLength(8);

  //ACT: Select Season 4 from Dropdown
  userEvent.click(queryAllByText(/season 1/i)[0]);
  const season4 = getByText(/season 4/i);
  userEvent.click(season4);

  //ASSERT: assert that season 4 has 3 episodes
  expect(getAllByTestId(/episode/i)).toHaveLength(3);
});
