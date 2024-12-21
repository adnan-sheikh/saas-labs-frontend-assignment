import { describe, vi, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { Pagination } from "../Pagination";

describe("Pagination Component", () => {
  test("renders total items, Previous and Next buttons", async () => {
    const { getByText } = render(
      <Pagination total={50} current={1} onChange={() => {}} />
    );

    await expect.element(getByText("Previous")).toBeInTheDocument();
    await expect.element(getByText("Next")).toBeInTheDocument();
    await expect.element(getByText("Page 1")).toBeInTheDocument();
    await expect.element(getByText("Total 50 items")).toBeInTheDocument();
  });

  test("disables Previous button on first page", async () => {
    const { getByText } = render(
      <Pagination total={50} current={1} onChange={() => {}} />
    );

    await expect.element(getByText("Previous")).toBeDisabled();
    await expect.element(getByText("Next")).not.toBeDisabled();
  });

  test("disables Next button on last page", async () => {
    const { getByText } = render(
      <Pagination total={50} current={10} onChange={() => {}} />
    );

    await expect.element(getByText("Previous")).not.toBeDisabled();
    await expect.element(getByText("Next")).toBeDisabled();
  });

  test("calls onChange with correct page when clicking Next", async () => {
    const onChange = vi.fn();
    const { getByText } = render(
      <Pagination total={50} current={1} onChange={onChange} />
    );

    await getByText("Next").click();
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
