import { expect, describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "@vitest/browser/context";
import { Pagination } from "../Pagination";

describe("Pagination Component", () => {
  test("renders pagination info and navigation buttons", async () => {
    render(<Pagination total={50} current={1} onChange={() => {}} />);

    await expect
      .element(page.getByText("Showing 1 - 5 of 50 projects"))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Previous" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Next" }))
      .toBeInTheDocument();
    await expect.element(page.getByText("Page 1 of 10")).toBeInTheDocument();
  });

  test("disables Previous button on first page", async () => {
    render(<Pagination total={50} current={1} onChange={() => {}} />);

    const prevButton = page.getByRole("button", { name: "Previous" });
    const nextButton = page.getByRole("button", { name: "Next" });

    await expect.element(prevButton).toBeDisabled();
    await expect.element(nextButton).not.toBeDisabled();
  });

  test("disables Next button on last page", async () => {
    render(<Pagination total={50} current={10} onChange={() => {}} />);

    const prevButton = page.getByRole("button", { name: "Previous" });
    const nextButton = page.getByRole("button", { name: "Next" });

    await expect.element(prevButton).not.toBeDisabled();
    await expect.element(nextButton).toBeDisabled();
  });

  test("calls onChange with correct page when clicking buttons", async () => {
    const onChange = vi.fn();
    render(<Pagination total={50} current={5} onChange={onChange} />);

    await userEvent.click(page.getByRole("button", { name: "Next" }));
    expect(onChange).toHaveBeenCalledWith(6);

    await userEvent.click(page.getByRole("button", { name: "Previous" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
