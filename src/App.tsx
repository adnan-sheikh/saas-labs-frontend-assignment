import { useState } from "react";
import { filterColumns, getColumns, parseText } from "./utils/index";
import { Pagination } from "./components";
import data from "../frontend-assignment.json";
import "./styles.css";
import { ProjectKey, ProjectRecord } from "./types";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const allColumns = getColumns(data);
  const requiredColumns = filterColumns(allColumns, [
    "s.no",
    "percentage.funded",
    "amt.pledged",
  ] as const);

  const indexOfLastRecord = currentPage * pageSize;
  const indexOfFirstRecord = indexOfLastRecord - pageSize;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderCell = (item: ProjectRecord, column: ProjectKey) => {
    switch (column) {
      case "s.no":
        return `#${item[column]}`;
      case "percentage.funded":
        return `${item[column]}%`;
      case "amt.pledged":
        return formatCurrency(item[column]);
      default:
        return item[column];
    }
  };

  return (
    <div className="table-container">
      <h2>Kickstarter Projects</h2>
      <table role="grid" aria-label="Funding Data">
        <thead>
          <tr role="row">
            {requiredColumns.map((col) => (
              <th key={col} scope="col">
                {parseText(col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item) => (
            <tr key={item["s.no"]} role="row">
              {requiredColumns.map((col) => (
                <td key={col} role="gridcell">
                  {renderCell(item, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        total={data.length}
        current={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
