import { expect, test, describe } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "@vitest/browser/context";
import App from "../App";

describe("App Component", () => {
  test("renders table headers correctly", async () => {
    render(<App />);

    await expect.element(page.getByText("S No")).toBeInTheDocument();
    await expect.element(page.getByText("Amt Pledged")).toBeInTheDocument();
    await expect
      .element(page.getByText("Percentage Funded"))
      .toBeInTheDocument();
  });

  test("shows 5 rows per page", async () => {
    render(<App />);

    const rows = await page.getByRole("row").elements();
    // +1 for header row
    expect(rows.length).toBe(6);
  });

  test("formats currency and percentage values", async () => {
    render(<App />);

    // Wait for the first row to be rendered
    await new Promise((resolve) => setTimeout(resolve, 0));
    const firstDataRow = (await page.getByRole("row").elements())[1];
    const cells = await page
      .elementLocator(firstDataRow)
      .getByRole("gridcell")
      .elements();

    expect(cells[1].textContent).toMatch(/^\$15,823$/);
    expect(cells[2].textContent).toMatch(/^186%$/);
  });
});
