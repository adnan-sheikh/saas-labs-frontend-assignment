import { describe, vi, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "@vitest/browser/context";
import { Pagination } from "../Pagination";

describe("Pagination Component", () => {
  test("renders pagination info and navigation buttons", async () => {
    render(<Pagination total={50} current={1} onChange={() => {}} />);

    await expect
      .element(page.getByText(/Showing 1 - 5 of 50 projects/))
      .toBeInTheDocument();

    await expect
      .element(page.getByRole("button", { name: /Previous/i }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: /Next/i }))
      .toBeInTheDocument();

    await expect.element(page.getByText(/Page/)).toBeInTheDocument();
    await expect.element(page.getByText(/of 10/)).toBeInTheDocument();
  });

  test("disables Previous button on first page", async () => {
    render(<Pagination total={50} current={1} onChange={() => {}} />);

    const prevButton = await page
      .getByRole("button", { name: /Previous/i })
      .element();
    const nextButton = await page
      .getByRole("button", { name: /Next/i })
      .element();

    await expect.element(prevButton).toBeDisabled();
    await expect.element(nextButton).not.toBeDisabled();
  });

  test("disables Next button on last page", async () => {
    render(<Pagination total={50} current={10} onChange={() => {}} />);

    const prevButton = await page
      .getByRole("button", { name: /Previous/i })
      .element();
    const nextButton = await page
      .getByRole("button", { name: /Next/i })
      .element();

    await expect.element(prevButton).not.toBeDisabled();
    await expect.element(nextButton).toBeDisabled();
  });

  test("calls onChange with correct page when clicking navigation buttons", async () => {
    const onChange = vi.fn();
    render(<Pagination total={50} current={5} onChange={onChange} />);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const nextButton = await page
      .getByRole("button", { name: /Next/i })
      .element();
    await page.elementLocator(nextButton).click();
    expect(onChange).toHaveBeenCalledWith(6);

    const prevButton = await page
      .getByRole("button", { name: /Previous/i })
      .element();
    await page.elementLocator(prevButton).click();
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
