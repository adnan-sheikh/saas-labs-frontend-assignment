function getColumns<T extends object>(data: T[]): (keyof T)[] {
  if (data.length === 0) {
    return [];
  }
  return Object.keys(data[0]) as (keyof T)[];
}

function filterColumns<T extends string, R extends T>(
  columns: T[],
  predicates: readonly R[]
): Extract<T, R>[] {
  return columns.filter((col): col is Extract<T, R> =>
    predicates.includes(col as R)
  );
}

function parseText(text: string, delimiter = "."): string {
  return text
    .split(delimiter)
    .map((word) => word.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()))
    .join(" ");
}

export { filterColumns, getColumns, parseText };
